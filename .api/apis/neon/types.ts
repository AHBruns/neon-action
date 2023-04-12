import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type CreateApiKeyBodyParam = FromSchema<typeof schemas.CreateApiKey.body>;
export type CreateApiKeyResponse200 = FromSchema<(typeof schemas.CreateApiKey.response)['200']>;
export type CreateApiKeyResponseDefault = FromSchema<
  (typeof schemas.CreateApiKey.response)['default']
>;
export type CreateProjectBodyParam = FromSchema<typeof schemas.CreateProject.body>;
export type CreateProjectBranchBodyParam = FromSchema<typeof schemas.CreateProjectBranch.body>;
export type CreateProjectBranchDatabaseBodyParam = FromSchema<
  typeof schemas.CreateProjectBranchDatabase.body
>;
export type CreateProjectBranchDatabaseMetadataParam = FromSchema<
  typeof schemas.CreateProjectBranchDatabase.metadata
>;
export type CreateProjectBranchDatabaseResponse201 = FromSchema<
  (typeof schemas.CreateProjectBranchDatabase.response)['201']
>;
export type CreateProjectBranchDatabaseResponseDefault = FromSchema<
  (typeof schemas.CreateProjectBranchDatabase.response)['default']
>;
export type CreateProjectBranchMetadataParam = FromSchema<
  typeof schemas.CreateProjectBranch.metadata
>;
export type CreateProjectBranchResponse201 = FromSchema<
  (typeof schemas.CreateProjectBranch.response)['201']
>;
export type CreateProjectBranchResponseDefault = FromSchema<
  (typeof schemas.CreateProjectBranch.response)['default']
>;
export type CreateProjectBranchRoleBodyParam = FromSchema<
  typeof schemas.CreateProjectBranchRole.body
>;
export type CreateProjectBranchRoleMetadataParam = FromSchema<
  typeof schemas.CreateProjectBranchRole.metadata
>;
export type CreateProjectBranchRoleResponse201 = FromSchema<
  (typeof schemas.CreateProjectBranchRole.response)['201']
>;
export type CreateProjectBranchRoleResponseDefault = FromSchema<
  (typeof schemas.CreateProjectBranchRole.response)['default']
>;
export type CreateProjectEndpointBodyParam = FromSchema<typeof schemas.CreateProjectEndpoint.body>;
export type CreateProjectEndpointMetadataParam = FromSchema<
  typeof schemas.CreateProjectEndpoint.metadata
>;
export type CreateProjectEndpointResponse201 = FromSchema<
  (typeof schemas.CreateProjectEndpoint.response)['201']
>;
export type CreateProjectEndpointResponseDefault = FromSchema<
  (typeof schemas.CreateProjectEndpoint.response)['default']
>;
export type CreateProjectResponse201 = FromSchema<(typeof schemas.CreateProject.response)['201']>;
export type CreateProjectResponseDefault = FromSchema<
  (typeof schemas.CreateProject.response)['default']
>;
export type DeleteProjectBranchDatabaseMetadataParam = FromSchema<
  typeof schemas.DeleteProjectBranchDatabase.metadata
>;
export type DeleteProjectBranchDatabaseResponse200 = FromSchema<
  (typeof schemas.DeleteProjectBranchDatabase.response)['200']
>;
export type DeleteProjectBranchDatabaseResponseDefault = FromSchema<
  (typeof schemas.DeleteProjectBranchDatabase.response)['default']
>;
export type DeleteProjectBranchMetadataParam = FromSchema<
  typeof schemas.DeleteProjectBranch.metadata
>;
export type DeleteProjectBranchResponse200 = FromSchema<
  (typeof schemas.DeleteProjectBranch.response)['200']
>;
export type DeleteProjectBranchResponseDefault = FromSchema<
  (typeof schemas.DeleteProjectBranch.response)['default']
>;
export type DeleteProjectBranchRoleMetadataParam = FromSchema<
  typeof schemas.DeleteProjectBranchRole.metadata
>;
export type DeleteProjectBranchRoleResponse200 = FromSchema<
  (typeof schemas.DeleteProjectBranchRole.response)['200']
>;
export type DeleteProjectBranchRoleResponseDefault = FromSchema<
  (typeof schemas.DeleteProjectBranchRole.response)['default']
>;
export type DeleteProjectEndpointMetadataParam = FromSchema<
  typeof schemas.DeleteProjectEndpoint.metadata
>;
export type DeleteProjectEndpointResponse200 = FromSchema<
  (typeof schemas.DeleteProjectEndpoint.response)['200']
>;
export type DeleteProjectEndpointResponseDefault = FromSchema<
  (typeof schemas.DeleteProjectEndpoint.response)['default']
>;
export type DeleteProjectMetadataParam = FromSchema<typeof schemas.DeleteProject.metadata>;
export type DeleteProjectResponse200 = FromSchema<(typeof schemas.DeleteProject.response)['200']>;
export type DeleteProjectResponseDefault = FromSchema<
  (typeof schemas.DeleteProject.response)['default']
>;
export type GetProjectBranchDatabaseMetadataParam = FromSchema<
  typeof schemas.GetProjectBranchDatabase.metadata
>;
export type GetProjectBranchDatabaseResponse200 = FromSchema<
  (typeof schemas.GetProjectBranchDatabase.response)['200']
>;
export type GetProjectBranchDatabaseResponseDefault = FromSchema<
  (typeof schemas.GetProjectBranchDatabase.response)['default']
>;
export type GetProjectBranchMetadataParam = FromSchema<typeof schemas.GetProjectBranch.metadata>;
export type GetProjectBranchResponse200 = FromSchema<
  (typeof schemas.GetProjectBranch.response)['200']
>;
export type GetProjectBranchResponseDefault = FromSchema<
  (typeof schemas.GetProjectBranch.response)['default']
>;
export type GetProjectBranchRoleMetadataParam = FromSchema<
  typeof schemas.GetProjectBranchRole.metadata
>;
export type GetProjectBranchRolePasswordMetadataParam = FromSchema<
  typeof schemas.GetProjectBranchRolePassword.metadata
>;
export type GetProjectBranchRolePasswordResponse200 = FromSchema<
  (typeof schemas.GetProjectBranchRolePassword.response)['200']
>;
export type GetProjectBranchRolePasswordResponse404 = FromSchema<
  (typeof schemas.GetProjectBranchRolePassword.response)['404']
>;
export type GetProjectBranchRolePasswordResponse412 = FromSchema<
  (typeof schemas.GetProjectBranchRolePassword.response)['412']
>;
export type GetProjectBranchRolePasswordResponseDefault = FromSchema<
  (typeof schemas.GetProjectBranchRolePassword.response)['default']
>;
export type GetProjectBranchRoleResponse200 = FromSchema<
  (typeof schemas.GetProjectBranchRole.response)['200']
>;
export type GetProjectBranchRoleResponseDefault = FromSchema<
  (typeof schemas.GetProjectBranchRole.response)['default']
>;
export type GetProjectEndpointMetadataParam = FromSchema<
  typeof schemas.GetProjectEndpoint.metadata
>;
export type GetProjectEndpointResponse200 = FromSchema<
  (typeof schemas.GetProjectEndpoint.response)['200']
>;
export type GetProjectEndpointResponseDefault = FromSchema<
  (typeof schemas.GetProjectEndpoint.response)['default']
>;
export type GetProjectMetadataParam = FromSchema<typeof schemas.GetProject.metadata>;
export type GetProjectOperationMetadataParam = FromSchema<
  typeof schemas.GetProjectOperation.metadata
>;
export type GetProjectOperationResponse200 = FromSchema<
  (typeof schemas.GetProjectOperation.response)['200']
>;
export type GetProjectOperationResponseDefault = FromSchema<
  (typeof schemas.GetProjectOperation.response)['default']
>;
export type GetProjectResponse200 = FromSchema<(typeof schemas.GetProject.response)['200']>;
export type GetProjectResponseDefault = FromSchema<(typeof schemas.GetProject.response)['default']>;
export type ListApiKeysResponse200 = FromSchema<(typeof schemas.ListApiKeys.response)['200']>;
export type ListApiKeysResponseDefault = FromSchema<
  (typeof schemas.ListApiKeys.response)['default']
>;
export type ListProjectBranchDatabasesMetadataParam = FromSchema<
  typeof schemas.ListProjectBranchDatabases.metadata
>;
export type ListProjectBranchDatabasesResponse200 = FromSchema<
  (typeof schemas.ListProjectBranchDatabases.response)['200']
>;
export type ListProjectBranchDatabasesResponseDefault = FromSchema<
  (typeof schemas.ListProjectBranchDatabases.response)['default']
>;
export type ListProjectBranchEndpointsMetadataParam = FromSchema<
  typeof schemas.ListProjectBranchEndpoints.metadata
>;
export type ListProjectBranchEndpointsResponse200 = FromSchema<
  (typeof schemas.ListProjectBranchEndpoints.response)['200']
>;
export type ListProjectBranchEndpointsResponseDefault = FromSchema<
  (typeof schemas.ListProjectBranchEndpoints.response)['default']
>;
export type ListProjectBranchRolesMetadataParam = FromSchema<
  typeof schemas.ListProjectBranchRoles.metadata
>;
export type ListProjectBranchRolesResponse200 = FromSchema<
  (typeof schemas.ListProjectBranchRoles.response)['200']
>;
export type ListProjectBranchRolesResponseDefault = FromSchema<
  (typeof schemas.ListProjectBranchRoles.response)['default']
>;
export type ListProjectBranchesMetadataParam = FromSchema<
  typeof schemas.ListProjectBranches.metadata
>;
export type ListProjectBranchesResponse200 = FromSchema<
  (typeof schemas.ListProjectBranches.response)['200']
>;
export type ListProjectBranchesResponseDefault = FromSchema<
  (typeof schemas.ListProjectBranches.response)['default']
>;
export type ListProjectEndpointsMetadataParam = FromSchema<
  typeof schemas.ListProjectEndpoints.metadata
>;
export type ListProjectEndpointsResponse200 = FromSchema<
  (typeof schemas.ListProjectEndpoints.response)['200']
>;
export type ListProjectEndpointsResponseDefault = FromSchema<
  (typeof schemas.ListProjectEndpoints.response)['default']
>;
export type ListProjectOperationsMetadataParam = FromSchema<
  typeof schemas.ListProjectOperations.metadata
>;
export type ListProjectOperationsResponse200 = FromSchema<
  (typeof schemas.ListProjectOperations.response)['200']
>;
export type ListProjectOperationsResponseDefault = FromSchema<
  (typeof schemas.ListProjectOperations.response)['default']
>;
export type ListProjectsConsumptionMetadataParam = FromSchema<
  typeof schemas.ListProjectsConsumption.metadata
>;
export type ListProjectsConsumptionResponse200 = FromSchema<
  (typeof schemas.ListProjectsConsumption.response)['200']
>;
export type ListProjectsConsumptionResponseDefault = FromSchema<
  (typeof schemas.ListProjectsConsumption.response)['default']
>;
export type ListProjectsMetadataParam = FromSchema<typeof schemas.ListProjects.metadata>;
export type ListProjectsResponse200 = FromSchema<(typeof schemas.ListProjects.response)['200']>;
export type ListProjectsResponseDefault = FromSchema<
  (typeof schemas.ListProjects.response)['default']
>;
export type ResetProjectBranchRolePasswordMetadataParam = FromSchema<
  typeof schemas.ResetProjectBranchRolePassword.metadata
>;
export type ResetProjectBranchRolePasswordResponse200 = FromSchema<
  (typeof schemas.ResetProjectBranchRolePassword.response)['200']
>;
export type ResetProjectBranchRolePasswordResponseDefault = FromSchema<
  (typeof schemas.ResetProjectBranchRolePassword.response)['default']
>;
export type RevokeApiKeyMetadataParam = FromSchema<typeof schemas.RevokeApiKey.metadata>;
export type RevokeApiKeyResponse200 = FromSchema<(typeof schemas.RevokeApiKey.response)['200']>;
export type RevokeApiKeyResponseDefault = FromSchema<
  (typeof schemas.RevokeApiKey.response)['default']
>;
export type SetPrimaryProjectBranchMetadataParam = FromSchema<
  typeof schemas.SetPrimaryProjectBranch.metadata
>;
export type SetPrimaryProjectBranchResponse200 = FromSchema<
  (typeof schemas.SetPrimaryProjectBranch.response)['200']
>;
export type SetPrimaryProjectBranchResponseDefault = FromSchema<
  (typeof schemas.SetPrimaryProjectBranch.response)['default']
>;
export type StartProjectEndpointMetadataParam = FromSchema<
  typeof schemas.StartProjectEndpoint.metadata
>;
export type StartProjectEndpointResponse200 = FromSchema<
  (typeof schemas.StartProjectEndpoint.response)['200']
>;
export type StartProjectEndpointResponseDefault = FromSchema<
  (typeof schemas.StartProjectEndpoint.response)['default']
>;
export type SuspendProjectEndpointMetadataParam = FromSchema<
  typeof schemas.SuspendProjectEndpoint.metadata
>;
export type SuspendProjectEndpointResponse200 = FromSchema<
  (typeof schemas.SuspendProjectEndpoint.response)['200']
>;
export type SuspendProjectEndpointResponseDefault = FromSchema<
  (typeof schemas.SuspendProjectEndpoint.response)['default']
>;
export type UpdateProjectBodyParam = FromSchema<typeof schemas.UpdateProject.body>;
export type UpdateProjectBranchBodyParam = FromSchema<typeof schemas.UpdateProjectBranch.body>;
export type UpdateProjectBranchDatabaseBodyParam = FromSchema<
  typeof schemas.UpdateProjectBranchDatabase.body
>;
export type UpdateProjectBranchDatabaseMetadataParam = FromSchema<
  typeof schemas.UpdateProjectBranchDatabase.metadata
>;
export type UpdateProjectBranchDatabaseResponse200 = FromSchema<
  (typeof schemas.UpdateProjectBranchDatabase.response)['200']
>;
export type UpdateProjectBranchDatabaseResponseDefault = FromSchema<
  (typeof schemas.UpdateProjectBranchDatabase.response)['default']
>;
export type UpdateProjectBranchMetadataParam = FromSchema<
  typeof schemas.UpdateProjectBranch.metadata
>;
export type UpdateProjectBranchResponse200 = FromSchema<
  (typeof schemas.UpdateProjectBranch.response)['200']
>;
export type UpdateProjectBranchResponseDefault = FromSchema<
  (typeof schemas.UpdateProjectBranch.response)['default']
>;
export type UpdateProjectEndpointBodyParam = FromSchema<typeof schemas.UpdateProjectEndpoint.body>;
export type UpdateProjectEndpointMetadataParam = FromSchema<
  typeof schemas.UpdateProjectEndpoint.metadata
>;
export type UpdateProjectEndpointResponse200 = FromSchema<
  (typeof schemas.UpdateProjectEndpoint.response)['200']
>;
export type UpdateProjectEndpointResponseDefault = FromSchema<
  (typeof schemas.UpdateProjectEndpoint.response)['default']
>;
export type UpdateProjectMetadataParam = FromSchema<typeof schemas.UpdateProject.metadata>;
export type UpdateProjectResponse200 = FromSchema<(typeof schemas.UpdateProject.response)['200']>;
export type UpdateProjectResponseDefault = FromSchema<
  (typeof schemas.UpdateProject.response)['default']
>;
