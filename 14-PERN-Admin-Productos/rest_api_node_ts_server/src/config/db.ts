import { Sequelize } from 'sequelize'

const db = new Sequelize('postgresql://rest_api_node_ts_zdi7_user:fddjHlG0MaFRUuZ6i9YIgN3cGAAgnSxu@dpg-cqtbskrv2p9s73dd6120-a.oregon-postgres.render.com/rest_api_node_ts_zdi7?ssl=true') // Se le agrega el ?ssl=true para que ya no de error a la conexión de la bd

export default db;