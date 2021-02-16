
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('user_id').index();
            table.string('username', 20)
                .notNullable()
                .unique()
                .index();
            table.string('password')
                .notNullable();
        })
        .createTable('posts', table => {
            table.increments('post_id').index();
            table.string('title', 128)
                .notNullable()
                .unique()
                .index();
            table.string('description', 256).notNullable();
            table.string('materials', 256)
                .notNullable();
            table.string('video');
            table.string('instructions');

            // Foreign key
            table.integer('user_id')
                .notNullable()
                .unsigned() // Permits only nonnegative numbers in this column.
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('steps', table => {
            table.increments('step_id').index();
            table.string('step_name', 256)
                .notNullable();
            table.integer('step_number')
                .notNullable();

            // Foreign key
            table.integer('post_id')
                .notNullable()
                .unsigned()
                .references('post_id')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.unique(['post_id', 'step_number']);
        })
        .createTable('likes', table => {
            table.increments('like_id').index();
            table.integer('user_id')
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('post_id')
                .notNullable()
                .references('post_id')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.unique(['user_id', 'post_id']);

            // MISC INFO about the like -- perhaps when created
            table.timestamp('created_at')
                .defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('posts')
        .dropTableIfExists('steps');
};
