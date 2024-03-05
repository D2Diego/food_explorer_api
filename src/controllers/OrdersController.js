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

    async update(request, response) {
        const { id, orderStatus } = request.body;
    
        await knex("orders").update({ orderStatus }).where({ id });
        
        return response.send("Order updated successfully.");
    }

    async index(request, response) {
        const user_id = request.user.id;

        const user = await knex("users").where({id: user_id}).first();
        let ordersQuery = knex("orders")
            .join("ordersItems", "orders.id", "ordersItems.order_id")
            .select([
                "orders.id",
                "orders.user_id",
                "orders.orderStatus",
                "orders.totalPrice",
                "orders.paymentMethod",
                "orders.created_at",
            ]).groupBy("orders.id");

        if (!user.isAdmin) {
            ordersQuery = ordersQuery.where({ user_id });
        }

        const orders = await ordersQuery;
        const ordersItems = await knex("ordersItems");

        const ordersWithItems = orders.map(order => ({
            ...order,
            items: ordersItems.filter(item => item.order_id === order.id)
        }));

        return response.json(ordersWithItems);
    }
}

module.exports = OrdersController;
