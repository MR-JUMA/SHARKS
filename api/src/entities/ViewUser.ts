import {ViewEntity, ViewColumn} from "typeorm";

@ViewEntity({
    expression: `
        SELECT "owner"."id" AS "owner_id", "employee"."id" AS "employee_id"
        FROM "users" AS "employee" INNER JOIN "users" AS "owner" 
        ON "employee"."owner_id" = "owner"."id"
    `
})
export class ViewUser {

  @ViewColumn()
  owner_id: number;

  @ViewColumn()
  employee_id: number;

}