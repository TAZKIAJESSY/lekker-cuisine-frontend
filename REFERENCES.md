1. Update an Array: https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061

2. Sequelize many-many: https://sequelize.org/master/manual/eager-loading

3. Sequelize updated(increment) by addition: https://stackoverflow.com/questions/55646233/updating-with-calculated-values-in-sequelize

=>Model.increment('seq', { by: 5, where: { id: 'model_id' });
or
=>Model.update({ seq: sequelize.literal('seq + 5') }, { where: { id: model_id } });
