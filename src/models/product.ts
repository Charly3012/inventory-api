import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Unique, AllowNull, Default } from "sequelize-typescript";
import { Category } from "./category";

@Table({
    tableName: "products",
    timestamps: true,
})
export class Product extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare name: string;

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    declare SKU: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare quantity: number;

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare price: number;

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

    // FK → Category
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare categoryId: number;

    @BelongsTo(() => Category)
    declare category: Category;
    }
