import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'neon/v2 (api/5.0.8)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Retrieves the API keys for your Neon account.
   * The response does not include API key tokens. A token is only provided when creating an
   * API key.
   * API keys can also be managed in the Neon Console.
   * For more information, see [Manage API keys](https://neon.tech/docs/manage/api-keys/).
   *
   * @summary Get a list of API keys
   */
  listApiKeys(): Promise<
    | FetchResponse<200, types.ListApiKeysResponse200>
    | FetchResponse<number, types.ListApiKeysResponseDefault>
  > {
    return this.core.fetch('/api_keys', 'get');
  }

  /**
   * Creates an API key.
   * The `key_name` is a user-specified name for the key.
   * This method returns an `id` and `key`. The `key` is a randomly generated, 64-bit token
   * required to access the Neon API.
   * API keys can also be managed in the Neon Console.
   * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
   *
   * @summary Create an API key
   */
  createApiKey(
    body: types.CreateApiKeyBodyParam
  ): Promise<
    | FetchResponse<200, types.CreateApiKeyResponse200>
    | FetchResponse<number, types.CreateApiKeyResponseDefault>
  > {
    return this.core.fetch('/api_keys', 'post', body);
  }

  /**
   * Revokes the specified API key.
   * An API key that is no longer needed can be revoked.
   * This action cannot be reversed.
   * You can obtain `key_id` values by listing the API keys for your Neon account.
   * API keys can also be managed in the Neon Console.
   * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
   *
   * @summary Revoke an API key
   */
  revokeApiKey(
    metadata: types.RevokeApiKeyMetadataParam
  ): Promise<
    | FetchResponse<200, types.RevokeApiKeyResponse200>
    | FetchResponse<number, types.RevokeApiKeyResponseDefault>
  > {
    return this.core.fetch('/api_keys/{key_id}', 'delete', metadata);
  }

  /**
   * Retrieves details for the specified operation.
   * An operation is an action performed on a Neon project resource.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain a `operation_id` by listing operations for the project.
   *
   * @summary Get operation details
   */
  getProjectOperation(
    metadata: types.GetProjectOperationMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetProjectOperationResponse200>
    | FetchResponse<number, types.GetProjectOperationResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/operations/{operation_id}', 'get', metadata);
  }

  /**
   * Retrieves a list of projects for the Neon account.
   * A project is the top-level object in the Neon object hierarchy.
   * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
   *
   * @summary Get a list of projects
   */
  listProjects(
    metadata?: types.ListProjectsMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectsResponse200>
    | FetchResponse<number, types.ListProjectsResponseDefault>
  > {
    return this.core.fetch('/projects', 'get', metadata);
  }

  /**
   * Creates a Neon project.
   * A project is the top-level object in the Neon object hierarchy.
   * Plan limits define how many projects you can create.
   * Neon's Free plan permits one project per Neon account.
   * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
   *
   * You can specify a region and PostgreSQL version in the request body.
   * Neon currently supports PostgreSQL 14 and 15.
   * For supported regions and `region_id` values, see
   * [Regions](https://neon.tech/docs/introduction/regions/).
   *
   * @summary Create a project
   */
  createProject(
    body: types.CreateProjectBodyParam
  ): Promise<
    | FetchResponse<201, types.CreateProjectResponse201>
    | FetchResponse<number, types.CreateProjectResponseDefault>
  > {
    return this.core.fetch('/projects', 'post', body);
  }

  /**
   * Retrieves information about the specified project.
   * A project is the top-level object in the Neon object hierarchy.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   *
   * @summary Get project details
   */
  getProject(
    metadata: types.GetProjectMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetProjectResponse200>
    | FetchResponse<number, types.GetProjectResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}', 'get', metadata);
  }

  /**
   * Updates the specified project.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * Neon permits updating the project name only.
   *
   * @summary Update a project
   */
  updateProject(
    body: types.UpdateProjectBodyParam,
    metadata: types.UpdateProjectMetadataParam
  ): Promise<
    | FetchResponse<200, types.UpdateProjectResponse200>
    | FetchResponse<number, types.UpdateProjectResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}', 'patch', body, metadata);
  }

  /**
   * Deletes the specified project.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * Deleting a project is a permanent action.
   * Deleting a project also deletes endpoints, branches, databases, and users that belong to
   * the project.
   *
   * @summary Delete a project
   */
  deleteProject(
    metadata: types.DeleteProjectMetadataParam
  ): Promise<
    | FetchResponse<200, types.DeleteProjectResponse200>
    | FetchResponse<number, types.DeleteProjectResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}', 'delete', metadata);
  }

  /**
   * Retrieves a list of operations for the specified Neon project.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * The number of operations returned can be large.
   * To paginate the response, issue an initial request with a `limit` value.
   * Then, add the `cursor` value that was returned in the response to the next request.
   *
   * @summary Get a list of operations
   */
  listProjectOperations(
    metadata: types.ListProjectOperationsMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectOperationsResponse200>
    | FetchResponse<number, types.ListProjectOperationsResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/operations', 'get', metadata);
  }

  /**
   * Creates a branch in the specified project.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   *
   * This method does not require a request body, but you can specify one to create an
   * endpoint for the branch or to select a non-default parent branch.
   * The default behavior is to create a branch from the project's root branch (`main`) with
   * no endpoint, and the branch name is auto-generated.
   * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * @summary Create a branch
   */
  createProjectBranch(
    body: types.CreateProjectBranchBodyParam,
    metadata: types.CreateProjectBranchMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateProjectBranchResponse201>
    | FetchResponse<number, types.CreateProjectBranchResponseDefault>
  >;
  /**
   * Creates a branch in the specified project.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   *
   * This method does not require a request body, but you can specify one to create an
   * endpoint for the branch or to select a non-default parent branch.
   * The default behavior is to create a branch from the project's root branch (`main`) with
   * no endpoint, and the branch name is auto-generated.
   * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * @summary Create a branch
   */
  createProjectBranch(
    metadata: types.CreateProjectBranchMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateProjectBranchResponse201>
    | FetchResponse<number, types.CreateProjectBranchResponseDefault>
  >;
  /**
   * Creates a branch in the specified project.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   *
   * This method does not require a request body, but you can specify one to create an
   * endpoint for the branch or to select a non-default parent branch.
   * The default behavior is to create a branch from the project's root branch (`main`) with
   * no endpoint, and the branch name is auto-generated.
   * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * @summary Create a branch
   */
  createProjectBranch(
    body?: types.CreateProjectBranchBodyParam | types.CreateProjectBranchMetadataParam,
    metadata?: types.CreateProjectBranchMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateProjectBranchResponse201>
    | FetchResponse<number, types.CreateProjectBranchResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/branches', 'post', body, metadata);
  }

  /**
   * Retrieves a list of branches for the specified project.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   *
   * Each Neon project has a root branch named `main`.
   * A `branch_id` value has a `br-` prefix.
   * A project may contain child branches that were branched from `main` or from another
   * branch.
   * A parent branch is identified by the `parent_id` value, which is the `id` of the parent
   * branch.
   * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * @summary Get a list of branches
   */
  listProjectBranches(
    metadata: types.ListProjectBranchesMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectBranchesResponse200>
    | FetchResponse<number, types.ListProjectBranchesResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/branches', 'get', metadata);
  }

  /**
   * Retrieves information about the specified branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain a `branch_id` by listing the project's branches.
   * A `branch_id` value has a `br-` prefix.
   *
   * Each Neon project has a root branch named `main`.
   * A project may contain child branches that were branched from `main` or from another
   * branch.
   * A parent branch is identified by a `parent_id` value, which is the `id` of the parent
   * branch.
   * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * @summary Get branch details
   */
  getProjectBranch(
    metadata: types.GetProjectBranchMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetProjectBranchResponse200>
    | FetchResponse<number, types.GetProjectBranchResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/branches/{branch_id}', 'get', metadata);
  }

  /**
   * Deletes the specified branch from a project, and places
   * all endpoints into an idle state, breaking existing client connections.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain a `branch_id` by listing the project's branches.
   * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * When a successful response status is received, the endpoints are still active,
   * and the branch is not yet deleted from storage.
   * The deletion occurs after all operations finish.
   * You cannot delete a branch if it is the only remaining branch in the project.
   * A project must have at least one branch.
   *
   * @summary Delete a branch
   */
  deleteProjectBranch(
    metadata: types.DeleteProjectBranchMetadataParam
  ): Promise<
    | FetchResponse<200, types.DeleteProjectBranchResponse200>
    | FetchResponse<number, types.DeleteProjectBranchResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/branches/{branch_id}', 'delete', metadata);
  }

  /**
   * Updates the specified branch. Only changing the branch name is supported.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * For more information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * @summary Update a branch
   */
  updateProjectBranch(
    body: types.UpdateProjectBranchBodyParam,
    metadata: types.UpdateProjectBranchMetadataParam
  ): Promise<
    | FetchResponse<200, types.UpdateProjectBranchResponse200>
    | FetchResponse<number, types.UpdateProjectBranchResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/branches/{branch_id}', 'patch', body, metadata);
  }

  /**
   * The primary mark is automatically removed from the previous primary branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * For more information, see [Manage branches](https://neon.tech/docs/manage/branches/).
   *
   * @summary Set the branch as the primary branch of a project
   */
  setPrimaryProjectBranch(
    metadata: types.SetPrimaryProjectBranchMetadataParam
  ): Promise<
    | FetchResponse<200, types.SetPrimaryProjectBranchResponse200>
    | FetchResponse<number, types.SetPrimaryProjectBranchResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/set_as_primary',
      'post',
      metadata
    );
  }

  /**
   * Retrieves a list of endpoints for the specified branch.
   * Currently, Neon permits only one endpoint per branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   *
   * @summary Get a list of branch endpoints
   */
  listProjectBranchEndpoints(
    metadata: types.ListProjectBranchEndpointsMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectBranchEndpointsResponse200>
    | FetchResponse<number, types.ListProjectBranchEndpointsResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/endpoints',
      'get',
      metadata
    );
  }

  /**
   * Retrieves a list of databases for the specified branch.
   * A branch can have multiple databases.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * For related information, see [Manage
   * databases](https://neon.tech/docs/manage/databases/).
   *
   * @summary Get a list of databases
   */
  listProjectBranchDatabases(
    metadata: types.ListProjectBranchDatabasesMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectBranchDatabasesResponse200>
    | FetchResponse<number, types.ListProjectBranchDatabasesResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/databases',
      'get',
      metadata
    );
  }

  /**
   * Creates a database in the specified branch.
   * A branch can have multiple databases.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * For related information, see [Manage
   * databases](https://neon.tech/docs/manage/databases/).
   *
   * @summary Create a database
   */
  createProjectBranchDatabase(
    body: types.CreateProjectBranchDatabaseBodyParam,
    metadata: types.CreateProjectBranchDatabaseMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateProjectBranchDatabaseResponse201>
    | FetchResponse<number, types.CreateProjectBranchDatabaseResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/databases',
      'post',
      body,
      metadata
    );
  }

  /**
   * Retrieves information about the specified database.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` and `database_name` by listing branch's databases.
   * For related information, see [Manage
   * databases](https://neon.tech/docs/manage/databases/).
   *
   * @summary Get database details
   */
  getProjectBranchDatabase(
    metadata: types.GetProjectBranchDatabaseMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetProjectBranchDatabaseResponse200>
    | FetchResponse<number, types.GetProjectBranchDatabaseResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/databases/{database_name}',
      'get',
      metadata
    );
  }

  /**
   * Updates the specified database in the branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` and `database_name` by listing the branch's databases.
   * For related information, see [Manage
   * databases](https://neon.tech/docs/manage/databases/).
   *
   * @summary Update a database
   */
  updateProjectBranchDatabase(
    body: types.UpdateProjectBranchDatabaseBodyParam,
    metadata: types.UpdateProjectBranchDatabaseMetadataParam
  ): Promise<
    | FetchResponse<200, types.UpdateProjectBranchDatabaseResponse200>
    | FetchResponse<number, types.UpdateProjectBranchDatabaseResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/databases/{database_name}',
      'patch',
      body,
      metadata
    );
  }

  /**
   * Deletes the specified database from the branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` and `database_name` by listing branch's databases.
   * For related information, see [Manage
   * databases](https://neon.tech/docs/manage/databases/).
   *
   * @summary Delete a database
   */
  deleteProjectBranchDatabase(
    metadata: types.DeleteProjectBranchDatabaseMetadataParam
  ): Promise<
    | FetchResponse<200, types.DeleteProjectBranchDatabaseResponse200>
    | FetchResponse<number, types.DeleteProjectBranchDatabaseResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/databases/{database_name}',
      'delete',
      metadata
    );
  }

  /**
   * Retrieves a list of roles from the specified branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * In Neon, the terms "role" and "user" are synonymous.
   * For related information, see [Manage users](https://neon.tech/docs/manage/users/).
   *
   * @summary Get a list of roles
   */
  listProjectBranchRoles(
    metadata: types.ListProjectBranchRolesMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectBranchRolesResponse200>
    | FetchResponse<number, types.ListProjectBranchRolesResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/branches/{branch_id}/roles', 'get', metadata);
  }

  /**
   * Creates a role in the specified branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * In Neon, the terms "role" and "user" are synonymous.
   * For related information, see [Manage users](https://neon.tech/docs/manage/users/).
   *
   * Connections established to the active read-write endpoint will be dropped.
   * If the read-write endpoint is idle, the endpoint becomes active for a short period of
   * time and is suspended afterward.
   *
   * @summary Create a role
   */
  createProjectBranchRole(
    body: types.CreateProjectBranchRoleBodyParam,
    metadata: types.CreateProjectBranchRoleMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateProjectBranchRoleResponse201>
    | FetchResponse<number, types.CreateProjectBranchRoleResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/roles',
      'post',
      body,
      metadata
    );
  }

  /**
   * Retrieves details about the specified role.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * You can obtain the `role_name` by listing the roles for a branch.
   * In Neon, the terms "role" and "user" are synonymous.
   * For related information, see [Managing users](https://neon.tech/docs/manage/users/).
   *
   * @summary Get role details
   */
  getProjectBranchRole(
    metadata: types.GetProjectBranchRoleMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetProjectBranchRoleResponse200>
    | FetchResponse<number, types.GetProjectBranchRoleResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/roles/{role_name}',
      'get',
      metadata
    );
  }

  /**
   * Deletes the specified role from the branch.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * You can obtain the `role_name` by listing the roles for a branch.
   * In Neon, the terms "role" and "user" are synonymous.
   * For related information, see [Managing users](https://neon.tech/docs/manage/users/).
   *
   * @summary Delete a role
   */
  deleteProjectBranchRole(
    metadata: types.DeleteProjectBranchRoleMetadataParam
  ): Promise<
    | FetchResponse<200, types.DeleteProjectBranchRoleResponse200>
    | FetchResponse<number, types.DeleteProjectBranchRoleResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/roles/{role_name}',
      'delete',
      metadata
    );
  }

  /**
   * Retrieves password of the specified role if possible.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * You can obtain the `role_name` by listing the roles for a branch.
   * In Neon, the terms "role" and "user" are synonymous.
   * For related information, see [Managing users](https://neon.tech/docs/manage/users/).
   *
   * @summary Get role password
   */
  getProjectBranchRolePassword(
    metadata: types.GetProjectBranchRolePasswordMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetProjectBranchRolePasswordResponse200>
    | FetchResponse<404, types.GetProjectBranchRolePasswordResponse404>
    | FetchResponse<412, types.GetProjectBranchRolePasswordResponse412>
    | FetchResponse<number, types.GetProjectBranchRolePasswordResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/roles/{role_name}/reveal_password',
      'get',
      metadata
    );
  }

  /**
   * Resets the password for the specified role.
   * Returns a new password and operations. The new password is ready to use when the last
   * operation finishes.
   * The old password remains valid until last operation finishes.
   * Connections to the read-write endpoint are dropped. If idle,
   * the read-write endpoint becomes active for a short period of time.
   *
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain the `branch_id` by listing the project's branches.
   * You can obtain the `role_name` by listing the roles for a branch.
   * In Neon, the terms "role" and "user" are synonymous.
   * For related information, see [Managing users](https://neon.tech/docs/manage/users/).
   *
   * @summary Reset the role password
   */
  resetProjectBranchRolePassword(
    metadata: types.ResetProjectBranchRolePasswordMetadataParam
  ): Promise<
    | FetchResponse<200, types.ResetProjectBranchRolePasswordResponse200>
    | FetchResponse<number, types.ResetProjectBranchRolePasswordResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/branches/{branch_id}/roles/{role_name}/reset_password',
      'post',
      metadata
    );
  }

  /**
   * Creates an endpoint for the specified branch.
   * An endpoint is a Neon compute instance.
   * There is a maximum of one endpoint per branch.
   * If the specified branch already has an endpoint, the operation fails.
   *
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain `branch_id` by listing the project's branches.
   * A `branch_id` has a `br-` prefix.
   * Currently, only the `read_write` endpoint type is supported.
   * For supported regions and `region_id` values, see
   * [Regions](https://neon.tech/docs/introduction/regions/).
   * For more information about endpoints, see [Manage
   * endpoints](https://neon.tech/docs/manage/endpoints/).
   *
   * @summary Create an endpoint
   */
  createProjectEndpoint(
    body: types.CreateProjectEndpointBodyParam,
    metadata: types.CreateProjectEndpointMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateProjectEndpointResponse201>
    | FetchResponse<number, types.CreateProjectEndpointResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/endpoints', 'post', body, metadata);
  }

  /**
   * Retrieves a list of endpoints for the specified project.
   * An endpoint is a Neon compute instance.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * For more information about endpoints, see [Manage
   * endpoints](https://neon.tech/docs/manage/endpoints/).
   *
   * @summary Get a list of endpoints
   */
  listProjectEndpoints(
    metadata: types.ListProjectEndpointsMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectEndpointsResponse200>
    | FetchResponse<number, types.ListProjectEndpointsResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/endpoints', 'get', metadata);
  }

  /**
   * Retrieves information about the specified endpoint.
   * An endpoint is a Neon compute instance.
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain an `endpoint_id` by listing your project's endpoints.
   * An `endpoint_id` has an `ep-` prefix.
   * For more information about endpoints, see [Manage
   * endpoints](https://neon.tech/docs/manage/endpoints/).
   *
   * @summary Get an endpoint
   */
  getProjectEndpoint(
    metadata: types.GetProjectEndpointMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetProjectEndpointResponse200>
    | FetchResponse<number, types.GetProjectEndpointResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}', 'get', metadata);
  }

  /**
   * Delete the specified endpoint.
   * An endpoint is a Neon compute instance.
   * Deleting an endpoint drops existing network connections to the endpoint.
   * The deletion is completed when last operation in the chain finishes successfully.
   *
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain an `endpoint_id` by listing your project's endpoints.
   * An `endpoint_id` has an `ep-` prefix.
   * For more information about endpoints, see [Manage
   * endpoints](https://neon.tech/docs/manage/endpoints/).
   *
   * @summary Delete an endpoint
   */
  deleteProjectEndpoint(
    metadata: types.DeleteProjectEndpointMetadataParam
  ): Promise<
    | FetchResponse<200, types.DeleteProjectEndpointResponse200>
    | FetchResponse<number, types.DeleteProjectEndpointResponseDefault>
  > {
    return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}', 'delete', metadata);
  }

  /**
   * Updates the specified endpoint. Currently, only changing the associated branch is
   * supported.
   * The branch that you specify cannot have an existing endpoint.
   *
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain an `endpoint_id` and `branch_id` by listing your project's endpoints.
   * An `endpoint_id` has an `ep-` prefix. A `branch_id` has a `br-` prefix.
   * For more information about endpoints, see [Manage
   * endpoints](https://neon.tech/docs/manage/endpoints/).
   *
   * If the returned list of operations is not empty, the endpoint is not ready to use.
   * The client must wait for the last operation to finish before using the endpoint.
   * If the endpoint was idle before the update, the endpoint becomes active for a short
   * period of time,
   * and the control plane suspends it again after the update.
   *
   * @summary Update an endpoint
   */
  updateProjectEndpoint(
    body: types.UpdateProjectEndpointBodyParam,
    metadata: types.UpdateProjectEndpointMetadataParam
  ): Promise<
    | FetchResponse<200, types.UpdateProjectEndpointResponse200>
    | FetchResponse<number, types.UpdateProjectEndpointResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/endpoints/{endpoint_id}',
      'patch',
      body,
      metadata
    );
  }

  /**
   * Starts an endpoint. The endpoint is ready to use
   * after the last operation in chain finishes successfully.
   *
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain an `endpoint_id` by listing your project's endpoints.
   * An `endpoint_id` has an `ep-` prefix.
   * For more information about endpoints, see [Manage
   * endpoints](https://neon.tech/docs/manage/endpoints/).
   *
   * @summary Start an endpoint
   */
  startProjectEndpoint(
    metadata: types.StartProjectEndpointMetadataParam
  ): Promise<
    | FetchResponse<200, types.StartProjectEndpointResponse200>
    | FetchResponse<number, types.StartProjectEndpointResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/endpoints/{endpoint_id}/start',
      'post',
      metadata
    );
  }

  /**
   * Suspend the specified endpoint
   * You can obtain a `project_id` by listing the projects for your Neon account.
   * You can obtain an `endpoint_id` by listing your project's endpoints.
   * An `endpoint_id` has an `ep-` prefix.
   * For more information about endpoints, see [Manage
   * endpoints](https://neon.tech/docs/manage/endpoints/).
   *
   * @summary Suspend an endpoint
   */
  suspendProjectEndpoint(
    metadata: types.SuspendProjectEndpointMetadataParam
  ): Promise<
    | FetchResponse<200, types.SuspendProjectEndpointResponse200>
    | FetchResponse<number, types.SuspendProjectEndpointResponseDefault>
  > {
    return this.core.fetch(
      '/projects/{project_id}/endpoints/{endpoint_id}/suspend',
      'post',
      metadata
    );
  }

  /**
   * Note, this is a preview API and could be subjected to significant changes in the future.
   * Retrieves a list of per-project consumption for the current billing period.
   *
   * @summary Get a list of projects consumption
   */
  listProjectsConsumption(
    metadata?: types.ListProjectsConsumptionMetadataParam
  ): Promise<
    | FetchResponse<200, types.ListProjectsConsumptionResponse200>
    | FetchResponse<number, types.ListProjectsConsumptionResponseDefault>
  > {
    return this.core.fetch('/consumption/projects', 'get', metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type {
  CreateApiKeyBodyParam,
  CreateApiKeyResponse200,
  CreateApiKeyResponseDefault,
  CreateProjectBodyParam,
  CreateProjectBranchBodyParam,
  CreateProjectBranchDatabaseBodyParam,
  CreateProjectBranchDatabaseMetadataParam,
  CreateProjectBranchDatabaseResponse201,
  CreateProjectBranchDatabaseResponseDefault,
  CreateProjectBranchMetadataParam,
  CreateProjectBranchResponse201,
  CreateProjectBranchResponseDefault,
  CreateProjectBranchRoleBodyParam,
  CreateProjectBranchRoleMetadataParam,
  CreateProjectBranchRoleResponse201,
  CreateProjectBranchRoleResponseDefault,
  CreateProjectEndpointBodyParam,
  CreateProjectEndpointMetadataParam,
  CreateProjectEndpointResponse201,
  CreateProjectEndpointResponseDefault,
  CreateProjectResponse201,
  CreateProjectResponseDefault,
  DeleteProjectBranchDatabaseMetadataParam,
  DeleteProjectBranchDatabaseResponse200,
  DeleteProjectBranchDatabaseResponseDefault,
  DeleteProjectBranchMetadataParam,
  DeleteProjectBranchResponse200,
  DeleteProjectBranchResponseDefault,
  DeleteProjectBranchRoleMetadataParam,
  DeleteProjectBranchRoleResponse200,
  DeleteProjectBranchRoleResponseDefault,
  DeleteProjectEndpointMetadataParam,
  DeleteProjectEndpointResponse200,
  DeleteProjectEndpointResponseDefault,
  DeleteProjectMetadataParam,
  DeleteProjectResponse200,
  DeleteProjectResponseDefault,
  GetProjectBranchDatabaseMetadataParam,
  GetProjectBranchDatabaseResponse200,
  GetProjectBranchDatabaseResponseDefault,
  GetProjectBranchMetadataParam,
  GetProjectBranchResponse200,
  GetProjectBranchResponseDefault,
  GetProjectBranchRoleMetadataParam,
  GetProjectBranchRolePasswordMetadataParam,
  GetProjectBranchRolePasswordResponse200,
  GetProjectBranchRolePasswordResponse404,
  GetProjectBranchRolePasswordResponse412,
  GetProjectBranchRolePasswordResponseDefault,
  GetProjectBranchRoleResponse200,
  GetProjectBranchRoleResponseDefault,
  GetProjectEndpointMetadataParam,
  GetProjectEndpointResponse200,
  GetProjectEndpointResponseDefault,
  GetProjectMetadataParam,
  GetProjectOperationMetadataParam,
  GetProjectOperationResponse200,
  GetProjectOperationResponseDefault,
  GetProjectResponse200,
  GetProjectResponseDefault,
  ListApiKeysResponse200,
  ListApiKeysResponseDefault,
  ListProjectBranchDatabasesMetadataParam,
  ListProjectBranchDatabasesResponse200,
  ListProjectBranchDatabasesResponseDefault,
  ListProjectBranchEndpointsMetadataParam,
  ListProjectBranchEndpointsResponse200,
  ListProjectBranchEndpointsResponseDefault,
  ListProjectBranchRolesMetadataParam,
  ListProjectBranchRolesResponse200,
  ListProjectBranchRolesResponseDefault,
  ListProjectBranchesMetadataParam,
  ListProjectBranchesResponse200,
  ListProjectBranchesResponseDefault,
  ListProjectEndpointsMetadataParam,
  ListProjectEndpointsResponse200,
  ListProjectEndpointsResponseDefault,
  ListProjectOperationsMetadataParam,
  ListProjectOperationsResponse200,
  ListProjectOperationsResponseDefault,
  ListProjectsConsumptionMetadataParam,
  ListProjectsConsumptionResponse200,
  ListProjectsConsumptionResponseDefault,
  ListProjectsMetadataParam,
  ListProjectsResponse200,
  ListProjectsResponseDefault,
  ResetProjectBranchRolePasswordMetadataParam,
  ResetProjectBranchRolePasswordResponse200,
  ResetProjectBranchRolePasswordResponseDefault,
  RevokeApiKeyMetadataParam,
  RevokeApiKeyResponse200,
  RevokeApiKeyResponseDefault,
  SetPrimaryProjectBranchMetadataParam,
  SetPrimaryProjectBranchResponse200,
  SetPrimaryProjectBranchResponseDefault,
  StartProjectEndpointMetadataParam,
  StartProjectEndpointResponse200,
  StartProjectEndpointResponseDefault,
  SuspendProjectEndpointMetadataParam,
  SuspendProjectEndpointResponse200,
  SuspendProjectEndpointResponseDefault,
  UpdateProjectBodyParam,
  UpdateProjectBranchBodyParam,
  UpdateProjectBranchDatabaseBodyParam,
  UpdateProjectBranchDatabaseMetadataParam,
  UpdateProjectBranchDatabaseResponse200,
  UpdateProjectBranchDatabaseResponseDefault,
  UpdateProjectBranchMetadataParam,
  UpdateProjectBranchResponse200,
  UpdateProjectBranchResponseDefault,
  UpdateProjectEndpointBodyParam,
  UpdateProjectEndpointMetadataParam,
  UpdateProjectEndpointResponse200,
  UpdateProjectEndpointResponseDefault,
  UpdateProjectMetadataParam,
  UpdateProjectResponse200,
  UpdateProjectResponseDefault,
} from './types';
