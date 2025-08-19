import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import path from "path";
import { Category } from "../models/category";
import { Product } from "../models/product";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
}

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: requireEnv("DATABASE_HOST"),
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: requireEnv("DATABASE_USERNAME"),
  password: requireEnv("DATABASE_PASSWORD"),
  database: requireEnv("DATABASE_NAME"),
  logging: process.env.DATABASE_LOGGING === "true" ? console.log : false,
  models: [Category, Product],
});

export async function initDb(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL exitosa");
    // await sequelize.sync(); // opcional, crea tablas si no existen
  } catch (error) {
    console.error("Error al conectar a MySQL:", (error as Error).message);
    throw error;
  }
}