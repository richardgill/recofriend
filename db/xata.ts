import { buildClient, BaseClientOptions, XataRecord } from "@xata.io/client";

export interface User {
  email?: string | null;
  name?: string | null;
}

export type UserRecord = User & XataRecord;

export interface Recommendation {
  url?: string | null;
  created?: string | null;
  description?: string | null;
  owner?: UserRecord | null;
  title?: string | null;
}

export type RecommendationRecord = Recommendation & XataRecord;

export interface Recommendation {
  recommendation?: RecommendationRecord | null;
  user?: UserRecord | null;
}

export type RecommendationRecord = Recommendation & XataRecord;

export interface Friend {
  owner?: UserRecord | null;
  friend?: UserRecord | null;
}

export type FriendRecord = Friend & XataRecord;

export type DatabaseSchema = {
  user: User;
  recommendation: Recommendation;
  recommendations: Recommendation;
  friends: Friend;
};

const tables = ["user", "recommendation", "recommendations", "friends"];

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      {
        databaseURL: "https://recofriend-qmaou4.xata.sh/db/recofriend",
        ...options,
      },
      tables
    );
  }
}
