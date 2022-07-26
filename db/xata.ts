import {
  BaseClientOptions,
  buildClient,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "user",
    columns: [
      { name: "email", type: "email" },
      { name: "name", type: "string" },
    ],
  },
  {
    name: "recommendation",
    columns: [
      { name: "owner", type: "link", link: { table: "user" } },
      { name: "title", type: "string" },
      { name: "created", type: "datetime" },
      { name: "url", type: "string" },
      { name: "description", type: "text" },
    ],
  },
  {
    name: "recommendations",
    columns: [
      {
        name: "recommendation",
        type: "link",
        link: { table: "recommendation" },
      },
      { name: "user", type: "link", link: { table: "user" } },
    ],
  },
  {
    name: "friends",
    columns: [
      { name: "owner", type: "link", link: { table: "user" } },
      { name: "friend", type: "link", link: { table: "user" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type DatabaseSchema = SchemaInference<SchemaTables>;

export type User = DatabaseSchema["user"];
export type UserRecord = User & XataRecord;

export type Recommendation = DatabaseSchema["recommendation"];
export type RecommendationRecord = Recommendation & XataRecord;

export type Recommendations = DatabaseSchema["recommendations"];
export type RecommendationsRecord = Recommendations & XataRecord;

export type Friend = DatabaseSchema["friends"];
export type FriendRecord = Friend & XataRecord;

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://recofriend2-p2rd1c.xata.sh/db/recofriend",
};

export class XataClient extends DatabaseClient<SchemaTables> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
