import { Sequelize } from "sequelize";

// 5. Instalar dependencias y la conexion a la bd
// Se le agrega esto a la url ?ssl=true para que no marque error

const db = new Sequelize('postgresql://rest_api_node_ts_oj9n_user:ZzgRHR1UOhLuO9wOEDr7i2lwWU2yhPaf@dpg-crqca8aj1k6c738eejc0-a.oregon-postgres.render.com/rest_api_node_ts_oj9n?ssl=true')

export default db;