const knex = require("../database/knex");

class OrdersController {
    async create(request, response) {
        const { cart, orderStatus, totalPrice, paymentMethod } = request.body;
        const user_id = request.user.id;

        const [order_id] = await knex("orders").insert({
            orderStatus,
            totalPrice,
            paymentMethod,
            user_id
        }).returning("id");

        const itemsInsert = cart.map(({ title, quantity, id }) => ({
            title,
            quantity,
            dish_id: id,
            order_id
        }));

        await knex("ordersItems").insert(itemsInsert);

        return response.status(201).json({ order_id });
    }

    async index(request, response) {
        const user_id = request.user.id;
        const user = await knex("users").where({id: user_id}).first();

        if (!user) {
            return response.status(404).json({ message: "Usuário não encontrado" });
        }

        let ordersQuery = knex("orders")
            .where({ user_id: user.isAdmin ? undefined : user_id })
            .select([
                "orders.id",
                "orders.user_id",
                "orders.orderStatus",
                "orders.totalPrice",
                "orders.paymentMethod",
                "orders.created_at",
            ]);

        if (!user.isAdmin) {
            ordersQuery = ordersQuery.join("ordersItems", "orders.id", "ordersItems.order_id").groupBy("orders.id");
        }

        const orders = await ordersQuery;
        for (let order of orders) {
            const items = await knex("ordersItems").where({ order_id: order.id });
            order.items = items;
        }

        return response.status(200).json(orders);
    }

    async update(request, response) {
        const { id, orderStatus } = request.body;

        await knex("orders").update({ orderStatus }).where({ id });

        return response.status(201).json({ message: "Pedido atualizado com sucesso." });
    }
}

module.exports = OrdersController;
