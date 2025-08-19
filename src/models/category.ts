import { Table, Column, Model, DataType, HasMany, AllowNull, Unique, Default } from "sequelize-typescript";
import { Product } from "./product";

    @Table({
        tableName: "categories",
        timestamps: true,
    })
    export class Category extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    declare description: string | null;

    @Default(true)
    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare isActive: boolean;

    @HasMany(() => Product)
    declare products: Product[];
}
