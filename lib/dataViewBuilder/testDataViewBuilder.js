import { createCategoricalDataViewBuilder } from "./dataViewBuilder";
import * as _ from "lodash";
export class TestDataViewBuilder {
    constructor() {
        this.aggregateFunction = _.sum;
    }
    static setDefaultQueryName(source) {
        if (!source.queryName) {
            source.queryName = TestDataViewBuilder.DataViewName + "." + source.displayName;
        }
        return source;
    }
    static getDataViewBuilderColumnIdentitySources(options) {
        let optionsArray = (_.isArray(options) ? options : [options]);
        let fields = optionsArray.map(() => { }), optionsIdentityExpressions = optionsArray.map((opt) => opt.values), identityExpressions = [];
        if (optionsIdentityExpressions.length > 1) {
            let identityExpressionsLength = optionsIdentityExpressions.length, identityExpressionsValuesLength = _.max(_.map(optionsIdentityExpressions, x => x.length));
            for (let vi = 0; vi < identityExpressionsValuesLength; vi++) {
                let current = optionsIdentityExpressions[0][vi];
                identityExpressions.push(current);
            }
        }
        else {
            identityExpressions = optionsIdentityExpressions[0];
        }
        return optionsArray.map((opt, i) => ({
            fields: fields,
            identities: identityExpressions
        }));
    }
    static getValuesTable(categories, values) {
        let columns = _.sortBy((categories || []).concat(values || []), x => x.source.index), maxLength = _.max(columns.map(x => x.values.length));
        return _.range(maxLength).map(i => columns.map(x => x.values[i]));
    }
    static createDataViewBuilderColumnOptions(categoriesColumns, valuesColumns, filter, customizeColumns) {
        let filterColumns = filter
            ? (options) => _.isArray(options.values) && filter(options)
            : (options) => _.isArray(options.values);
        let resultCategoriesColumns = _.isEmpty(categoriesColumns) ? [] : _
            .flatten(categoriesColumns).filter(filterColumns);
        let resultValuesColumns = _.isEmpty(valuesColumns) ? [] : _
            .flatten(valuesColumns).filter(filterColumns);
        let allColumns = (resultCategoriesColumns || []).concat(resultValuesColumns || []);
        allColumns.forEach((x, i) => x.source.index = i);
        if (customizeColumns) {
            allColumns.forEach((column) => customizeColumns(column.source));
        }
        allColumns.forEach((column) => {
            if (column.source.format) {
                let objects = column.source.objects = (column.source.objects || {});
                objects.general = objects.general || {};
                objects.general.formatString = objects.general.formatString || column.source.format;
            }
        });
        return {
            categories: resultCategoriesColumns.filter(x => !x.isGroup),
            grouped: resultCategoriesColumns.filter(x => x.isGroup),
            values: resultValuesColumns
        };
    }
    static setUpDataViewBuilderColumnOptions(options, aggregateFunction) {
        let resultOptions = _.clone(options);
        resultOptions.categories = resultOptions.categories && resultOptions.categories.map(x => _.clone(x));
        resultOptions.values = resultOptions.values && resultOptions.values.map(x => _.clone(x));
        resultOptions.grouped = resultOptions.grouped && resultOptions.grouped.map(x => _.clone(x));
        if (!_.isEmpty(options.categories)) {
            resultOptions.categories.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
            let allRows = TestDataViewBuilder.getValuesTable(options.categories, options.values);
            let categoriesLength = options.categories.length;
            let grouped = _.toArray(_.groupBy(allRows, x => _.take(x, categoriesLength)));
            resultOptions.categories.forEach((c, i) => c.values = grouped.map(x => x[0][i] === undefined ? null : x[0][i]));
            if (!_.isEmpty(options.values) && _.isEmpty(options.grouped)) { // Not completed for group categories
                resultOptions.values.forEach((c, i) => c.values = grouped.map(v => aggregateFunction(v.map(x => x[categoriesLength + i] || 0))));
            }
        }
        if (!_.isEmpty(options.values)) {
            resultOptions.values.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
        }
        if (!_.isEmpty(options.grouped)) {
            resultOptions.grouped.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
        }
        return resultOptions;
    }
    static setUpDataView(dataView, options) {
        if (!_.isEmpty(options.categories) && _.isEmpty(options.grouped)) {
            let category = dataView.categorical.categories[0];
            // Tree. (completed only for one category)
            dataView.tree = {
                root: {
                    childIdentityFields: category.identityFields,
                    children: category.values.map((value, index) => {
                        return {
                            values: [value],
                            name: value,
                            identity: category.identity && category.identity[index]
                        };
                    })
                }
            };
            // Table.
            dataView.table = {
                columns: dataView.categorical.categories.concat(dataView.categorical.values || []).map(x => x.source),
                identityFields: category.identityFields,
                rows: TestDataViewBuilder.getValuesTable(dataView.categorical.categories, dataView.categorical.values)
            };
            if (_.isEmpty(options.values)) {
                delete dataView.categorical.values;
            }
        }
        if (dataView.categorical.values) {
            let grouped = dataView.categorical.values.grouped();
            dataView.categorical.values.grouped = () => grouped;
        }
        return dataView;
    }
    createCategoricalDataViewBuilder(categoriesColumns, valuesColumns, columnNames, customizeColumns) {
        let builder = createCategoricalDataViewBuilder();
        let originalOptions = TestDataViewBuilder.createDataViewBuilderColumnOptions(categoriesColumns, valuesColumns, columnNames && (options => _.includes(columnNames, options.source.displayName)), customizeColumns);
        let options = TestDataViewBuilder.setUpDataViewBuilderColumnOptions(originalOptions, this.aggregateFunction);
        if (!_.isEmpty(options.categories)) {
            let identityFrom = TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(options.categories);
            builder.withCategories(options.categories.map((category, i) => ({
                source: category.source,
                values: category.values,
                objects: category.objects,
                identity: identityFrom[i].identities,
                identityFields: identityFrom[i].fields
            })));
        }
        if (!_.isEmpty(options.grouped)) {
            let groupedCategory = options.grouped[0]; // Finished only for one category.
            let categoryValues = originalOptions.categories
                && originalOptions.categories[0]
                && originalOptions.categories[0].values
                || [];
            let uniqueCategoryValues = _.uniq(categoryValues) || [undefined], uniqueGroupedValues = _.uniq(groupedCategory.values);
            builder.withGroupedValues({
                groupColumn: {
                    source: groupedCategory.source,
                    values: uniqueGroupedValues,
                    identityFrom: TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(groupedCategory)[0]
                },
                valueColumns: options.values.map(x => ({ source: x.source })),
                data: uniqueGroupedValues.map(groupedValue => options.values.map((column, columnIndex) => ({
                    values: column.values && uniqueCategoryValues
                        .map(categoryValue => {
                        let index = _.findIndex(_.range(categoryValues.length), i => categoryValues[i] === categoryValue && groupedCategory.values[i] === groupedValue);
                        return column.values[index] === undefined ? null : column.values[index];
                    }),
                    highlights: column.highlights,
                    minLocal: column.minLocal,
                    maxLocal: column.maxLocal
                })))
            });
        }
        else if (!_.isEmpty(options.values)) {
            builder.withValues({ columns: options.values });
        }
        let builderBuild = builder.build.bind(builder);
        builder.build = () => {
            return TestDataViewBuilder.setUpDataView(builderBuild(), options);
        };
        return builder;
    }
}
TestDataViewBuilder.DataViewName = "Data";
//# sourceMappingURL=testDataViewBuilder.js.map