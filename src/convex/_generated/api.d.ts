/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as adminSetup from "../adminSetup.js";
import type * as analytics from "../analytics.js";
import type * as auth from "../auth.js";
import type * as auth_emailOtp from "../auth/emailOtp.js";
import type * as bookings from "../bookings.js";
import type * as http from "../http.js";
import type * as projects from "../projects.js";
import type * as queries from "../queries.js";
import type * as reviews from "../reviews.js";
import type * as seed from "../seed.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  adminSetup: typeof adminSetup;
  analytics: typeof analytics;
  auth: typeof auth;
  "auth/emailOtp": typeof auth_emailOtp;
  bookings: typeof bookings;
  http: typeof http;
  projects: typeof projects;
  queries: typeof queries;
  reviews: typeof reviews;
  seed: typeof seed;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
