const CreateApiKey = {
  body: {
    type: 'object',
    required: ['key_name'],
    properties: {
      key_name: {
        type: 'string',
        description:
          'A user-specified API key name. This value is required when creating an API key.',
        examples: ['mykey'],
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      required: ['key', 'id'],
      properties: {
        id: {
          description: 'The API key ID',
          type: 'integer',
          format: 'int64',
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        key: {
          description: 'The generated 64-bit token required to access the Neon API',
          type: 'string',
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateProject = {
  body: {
    type: 'object',
    required: ['project'],
    properties: {
      project: {
        type: 'object',
        properties: {
          settings: {
            type: 'object',
            properties: {
              quota: {
                type: 'object',
                description:
                  'The consumption quota of a project.\nAfter the quota has been exceeded, it is impossible to use the project until either:\n* Neon cloud resets the calculated consumption,\n* or the user increases quota for the project.\nThe Neon cloud resets the quota at the beginning of the billing period.\n\nIf the quota is not set, the project can use as many resources as needed.\n',
                properties: {
                  active_time_sec: {
                    description:
                      "The total amount of wall-clock time allowed to be spent by a project's compute endpoints.\n",
                    type: 'integer',
                    format: 'int64',
                    minimum: 0,
                    maximum: 9223372036854776000,
                  },
                  cpu_quota_sec: {
                    description:
                      "The total amount of CPU seconds allowed to be spent by a project's compute endpoints.\n",
                    type: 'integer',
                    format: 'int64',
                    minimum: 0,
                    maximum: 9223372036854776000,
                  },
                },
              },
            },
          },
          name: { description: 'The project name', type: 'string', examples: ['myproject'] },
          branch: {
            type: 'object',
            properties: {
              name: {
                description:
                  'The branch name. If not specified, the default branch name will be used.\n',
                type: 'string',
              },
              role_name: {
                description:
                  'The role name. If not specified, the default role name will be used.\n',
                type: 'string',
              },
              database_name: {
                description:
                  'The database name. If not specified, the default database name will be used.\n',
                type: 'string',
              },
            },
          },
          autoscaling_limit_min_cu: {
            description: 'The minimum number of CPU units\n',
            type: 'number',
          },
          autoscaling_limit_max_cu: {
            description: 'The maximum number of CPU units\n',
            type: 'number',
          },
          provisioner: {
            type: 'string',
            description: 'The Neon compute provisioner.\n',
            enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
          },
          region_id: {
            description:
              'The region identifier. See [the documentation](https://neon.tech/docs/introduction/regions) for the list of supported regions.\n',
            type: 'string',
          },
          default_endpoint_settings: {
            description: 'A raw representation of PostgreSQL settings',
            type: 'object',
            additionalProperties: { type: 'string' },
          },
          pg_version: {
            description:
              'The major PostgreSQL version number. Currently supported version are `14` and `15`.',
            type: 'integer',
          },
          store_passwords: {
            description:
              'Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n',
            type: 'boolean',
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '201': {
      type: 'object',
      required: [
        'branch',
        'connection_uris',
        'databases',
        'endpoints',
        'operations',
        'project',
        'roles',
      ],
      properties: {
        project: {
          type: 'object',
          required: [
            'consumption_period_end',
            'consumption_period_start',
            'active_time_seconds',
            'compute_time_seconds',
            'written_data_bytes',
            'data_transfer_bytes',
            'data_storage_bytes_hour',
            'id',
            'platform_id',
            'region_id',
            'name',
            'pg_version',
            'proxy_host',
            'branch_logical_size_limit',
            'branch_logical_size_limit_bytes',
            'store_passwords',
            'cpu_used_sec',
            'provisioner',
            'creation_source',
            'created_at',
            'updated_at',
            'owner_id',
          ],
          properties: {
            data_storage_bytes_hour: {
              description:
                'Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            data_transfer_bytes: {
              description:
                'Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            written_data_bytes: {
              description:
                'Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            compute_time_seconds: {
              description:
                "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n",
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            active_time_seconds: {
              description:
                'Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            cpu_used_sec: {
              description: 'DEPRECATED, use compute_time instead.\n',
              type: 'integer',
              format: 'int64',
              deprecated: true,
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            id: {
              description: 'The project ID\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            platform_id: {
              description:
                'The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n',
              type: 'string',
              examples: ['aws'],
            },
            region_id: {
              description: 'The region identifier\n',
              type: 'string',
              examples: ['aws-us-east-2'],
            },
            name: {
              description: 'The project name\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
              examples: ['k8s-pod'],
            },
            default_endpoint_settings: {
              type: 'object',
              description: 'A collection of settings for a Neon endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            settings: {
              type: 'object',
              properties: {
                quota: {
                  type: 'object',
                  description:
                    'The consumption quota of a project.\nAfter the quota has been exceeded, it is impossible to use the project until either:\n* Neon cloud resets the calculated consumption,\n* or the user increases quota for the project.\nThe Neon cloud resets the quota at the beginning of the billing period.\n\nIf the quota is not set, the project can use as many resources as needed.\n',
                  properties: {
                    active_time_sec: {
                      description:
                        "The total amount of wall-clock time allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                    cpu_quota_sec: {
                      description:
                        "The total amount of CPU seconds allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                  },
                },
              },
            },
            pg_version: {
              description:
                'The major PostgreSQL version number. Currently supported version are `14` and `15`.',
              type: 'integer',
              examples: [15],
            },
            proxy_host: {
              description:
                'The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            branch_logical_size_limit: {
              description: 'The logical size limit for a branch. The value is in MiB.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_logical_size_limit_bytes: {
              description: 'The logical size limit for a branch. The value is in B.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            store_passwords: {
              description:
                'Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n',
              type: 'boolean',
              examples: [true],
            },
            maintenance_starts_at: {
              description:
                'A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The project creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the project was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the project was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            synthetic_storage_size: {
              description:
                'Experimental. Do not use this field yet.\nThe data storage size in bytes.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            consumption_period_start: {
              description:
                'A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            consumption_period_end: {
              description:
                'A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            quota_reset_at: {
              deprecated: true,
              description:
                'DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets\n',
              type: 'string',
              format: 'date-time',
            },
            owner_id: { type: 'string' },
            owner: {
              type: 'object',
              required: ['email', 'branches_limit', 'subscription_type'],
              properties: {
                email: { type: 'string' },
                branches_limit: { type: 'integer' },
                subscription_type: {
                  type: 'string',
                  description:
                    'Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be "UNKNOWN"\n\n\n`UNKNOWN` `free` `pro` `platform_partnership` `enterprise`',
                  enum: ['UNKNOWN', 'free', 'pro', 'platform_partnership', 'enterprise'],
                },
              },
            },
          },
        },
        connection_uris: {
          type: 'array',
          items: {
            type: 'object',
            required: ['connection_uri'],
            properties: {
              connection_uri: {
                description:
                  'Connection URI is same as specified in https://www.postgresql.org/docs/current/libpq-connect.html#id-1.7.3.8.3.6\nIt is a ready to use string for psql or for DATABASE_URL environment variable.\n',
                type: 'string',
              },
            },
          },
        },
        roles: {
          type: 'array',
          items: {
            type: 'object',
            required: ['branch_id', 'name', 'created_at', 'updated_at'],
            properties: {
              branch_id: {
                description: 'The ID of the branch to which the role belongs\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              name: { description: 'The role name\n', type: 'string', examples: ['casey'] },
              password: { description: 'The role password\n', type: 'string' },
              protected: {
                description: 'Whether or not the role is system-protected\n',
                type: 'boolean',
              },
              created_at: {
                description: 'A timestamp indicating when the role was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the role was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
            },
          },
        },
        databases: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'branch_id', 'name', 'owner_name', 'created_at', 'updated_at'],
            properties: {
              id: {
                description: 'The database ID\n',
                type: 'integer',
                format: 'int64',
                examples: [834686],
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              branch_id: {
                description: 'The ID of the branch to which the database belongs\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              name: { description: 'The database name\n', type: 'string', examples: ['neondb'] },
              owner_name: {
                description: 'The name of role that owns the database\n',
                type: 'string',
                examples: ['casey'],
              },
              created_at: {
                description: 'A timestamp indicating when the database was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the database was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: [834686],
              },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
            },
          },
        },
        branch: {
          type: 'object',
          required: [
            'id',
            'project_id',
            'name',
            'current_state',
            'creation_source',
            'created_at',
            'updated_at',
            'primary',
            'cpu_used_sec',
          ],
          properties: {
            id: {
              description:
                'The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            project_id: {
              description: 'The ID of the project to which the branch belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            parent_id: {
              description: 'The `branch_id` of the parent branch\n',
              type: 'string',
              examples: ['br-aged-salad-637688'],
            },
            parent_lsn: {
              description:
                'The Log Sequence Number (LSN) on the parent branch from which this branch was created\n',
              type: 'string',
              examples: ['0/1DE2850'],
            },
            parent_timestamp: {
              description:
                'The point in time on the parent branch from which this branch was created\n',
              type: 'string',
              format: 'date-time',
            },
            name: { description: 'The branch name\n', type: 'string', examples: ['dev2'] },
            current_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
              examples: ['ready'],
            },
            pending_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
            },
            logical_size: {
              description: 'The logical size of the branch, in bytes\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            creation_source: {
              description: 'The branch creation source\n',
              type: 'string',
              examples: ['console'],
            },
            primary: {
              description: "Whether the branch is the project's primary branch\n",
              type: 'boolean',
              examples: [true],
            },
            cpu_used_sec: {
              description:
                'CPU seconds used by all the endpoints of the branch, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            created_at: {
              description: 'A timestamp indicating when the branch was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T19:09:48Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the branch was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-01T19:53:05Z'],
            },
          },
        },
        endpoints: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'host',
              'id',
              'project_id',
              'branch_id',
              'region_id',
              'autoscaling_limit_max_cu',
              'autoscaling_limit_min_cu',
              'type',
              'current_state',
              'pooler_enabled',
              'pooler_mode',
              'disabled',
              'passwordless_access',
              'creation_source',
              'created_at',
              'updated_at',
              'settings',
              'proxy_host',
              'suspend_timeout_seconds',
              'provisioner',
            ],
            properties: {
              host: {
                description:
                  'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
              },
              id: {
                description:
                  'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The ID of the project to which the compute endpoint belongs\n',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The ID of the branch that the compute endpoint is associated with\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              autoscaling_limit_min_cu: {
                description: 'The minimum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              autoscaling_limit_max_cu: {
                description: 'The maximum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              region_id: {
                type: 'string',
                description: 'The region identifier\n',
                examples: ['aws-us-east-2'],
              },
              type: {
                description:
                  'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
                type: 'string',
                enum: ['read_only', 'read_write'],
                examples: ['read_write'],
              },
              current_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['init'],
              },
              pending_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['active'],
              },
              settings: {
                type: 'object',
                description: 'A collection of settings for a compute endpoint',
                properties: {
                  pg_settings: {
                    description: 'A raw representation of PostgreSQL settings',
                    type: 'object',
                    additionalProperties: { type: 'string' },
                  },
                },
              },
              pooler_enabled: {
                description: 'Whether connection pooling is enabled for the compute endpoint\n',
                type: 'boolean',
              },
              pooler_mode: {
                description:
                  'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
                type: 'string',
                enum: ['transaction'],
                examples: ['transaction'],
              },
              disabled: {
                description: 'Whether to restrict connections to the compute endpoint\n',
                type: 'boolean',
              },
              passwordless_access: {
                description: 'Whether to permit passwordless access to the compute endpoint\n',
                type: 'boolean',
                examples: [true],
              },
              last_active: {
                description: 'A timestamp indicating when the compute endpoint was last active\n',
                type: 'string',
                format: 'date-time',
              },
              creation_source: {
                description: 'The compute endpoint creation source\n',
                type: 'string',
                examples: ['console'],
              },
              created_at: {
                description: 'A timestamp indicating when the compute endpoint was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the compute endpoint was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              proxy_host: {
                description: 'DEPRECATED. Use the "host" property instead.\n',
                type: 'string',
                examples: ['us-east-2.aws.neon.tech'],
              },
              suspend_timeout_seconds: {
                description:
                  'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
                type: 'integer',
                format: 'int64',
                minimum: -1,
                maximum: 86400,
              },
              provisioner: {
                type: 'string',
                description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
                enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
                examples: ['k8s-pod'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateProjectBranch = {
  body: {
    type: 'object',
    properties: {
      endpoints: {
        type: 'array',
        items: {
          type: 'object',
          required: ['type'],
          properties: {
            type: {
              description:
                'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n',
              type: 'string',
              enum: ['read_only', 'read_write'],
            },
            autoscaling_limit_min_cu: {
              description: 'The minimum number of CPU units\n',
              type: 'number',
            },
            autoscaling_limit_max_cu: {
              description: 'The maximum number of CPU units\n',
              type: 'number',
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
            },
            suspend_timeout_seconds: {
              description:
                'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
              type: 'integer',
              format: 'int64',
              minimum: -1,
              maximum: 86400,
            },
          },
        },
      },
      branch: {
        type: 'object',
        properties: {
          parent_id: {
            description: 'The `branch_id` of the parent branch\n',
            type: 'string',
            examples: ['br-aged-salad-637688'],
          },
          name: { description: 'The branch name\n', type: 'string', examples: ['mybranch'] },
          parent_lsn: {
            description:
              'A Log Sequence Number (LSN) on the parent branch. The branch will be created with data from this LSN.\n',
            type: 'string',
          },
          parent_timestamp: {
            description:
              'A timestamp identifying a point in time on the parent branch. The branch will be created with data starting from this point in time.\n',
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      required: ['branch', 'endpoints', 'operations'],
      properties: {
        branch: {
          type: 'object',
          required: [
            'id',
            'project_id',
            'name',
            'current_state',
            'creation_source',
            'created_at',
            'updated_at',
            'primary',
            'cpu_used_sec',
          ],
          properties: {
            id: {
              description:
                'The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            project_id: {
              description: 'The ID of the project to which the branch belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            parent_id: {
              description: 'The `branch_id` of the parent branch\n',
              type: 'string',
              examples: ['br-aged-salad-637688'],
            },
            parent_lsn: {
              description:
                'The Log Sequence Number (LSN) on the parent branch from which this branch was created\n',
              type: 'string',
              examples: ['0/1DE2850'],
            },
            parent_timestamp: {
              description:
                'The point in time on the parent branch from which this branch was created\n',
              type: 'string',
              format: 'date-time',
            },
            name: { description: 'The branch name\n', type: 'string', examples: ['dev2'] },
            current_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
              examples: ['ready'],
            },
            pending_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
            },
            logical_size: {
              description: 'The logical size of the branch, in bytes\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            creation_source: {
              description: 'The branch creation source\n',
              type: 'string',
              examples: ['console'],
            },
            primary: {
              description: "Whether the branch is the project's primary branch\n",
              type: 'boolean',
              examples: [true],
            },
            cpu_used_sec: {
              description:
                'CPU seconds used by all the endpoints of the branch, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            created_at: {
              description: 'A timestamp indicating when the branch was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T19:09:48Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the branch was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-01T19:53:05Z'],
            },
          },
        },
        endpoints: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'host',
              'id',
              'project_id',
              'branch_id',
              'region_id',
              'autoscaling_limit_max_cu',
              'autoscaling_limit_min_cu',
              'type',
              'current_state',
              'pooler_enabled',
              'pooler_mode',
              'disabled',
              'passwordless_access',
              'creation_source',
              'created_at',
              'updated_at',
              'settings',
              'proxy_host',
              'suspend_timeout_seconds',
              'provisioner',
            ],
            properties: {
              host: {
                description:
                  'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
              },
              id: {
                description:
                  'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The ID of the project to which the compute endpoint belongs\n',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The ID of the branch that the compute endpoint is associated with\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              autoscaling_limit_min_cu: {
                description: 'The minimum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              autoscaling_limit_max_cu: {
                description: 'The maximum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              region_id: {
                type: 'string',
                description: 'The region identifier\n',
                examples: ['aws-us-east-2'],
              },
              type: {
                description:
                  'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
                type: 'string',
                enum: ['read_only', 'read_write'],
                examples: ['read_write'],
              },
              current_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['init'],
              },
              pending_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['active'],
              },
              settings: {
                type: 'object',
                description: 'A collection of settings for a compute endpoint',
                properties: {
                  pg_settings: {
                    description: 'A raw representation of PostgreSQL settings',
                    type: 'object',
                    additionalProperties: { type: 'string' },
                  },
                },
              },
              pooler_enabled: {
                description: 'Whether connection pooling is enabled for the compute endpoint\n',
                type: 'boolean',
              },
              pooler_mode: {
                description:
                  'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
                type: 'string',
                enum: ['transaction'],
                examples: ['transaction'],
              },
              disabled: {
                description: 'Whether to restrict connections to the compute endpoint\n',
                type: 'boolean',
              },
              passwordless_access: {
                description: 'Whether to permit passwordless access to the compute endpoint\n',
                type: 'boolean',
                examples: [true],
              },
              last_active: {
                description: 'A timestamp indicating when the compute endpoint was last active\n',
                type: 'string',
                format: 'date-time',
              },
              creation_source: {
                description: 'The compute endpoint creation source\n',
                type: 'string',
                examples: ['console'],
              },
              created_at: {
                description: 'A timestamp indicating when the compute endpoint was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the compute endpoint was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              proxy_host: {
                description: 'DEPRECATED. Use the "host" property instead.\n',
                type: 'string',
                examples: ['us-east-2.aws.neon.tech'],
              },
              suspend_timeout_seconds: {
                description:
                  'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
                type: 'integer',
                format: 'int64',
                minimum: -1,
                maximum: 86400,
              },
              provisioner: {
                type: 'string',
                description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
                enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
              },
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
            },
          },
        },
        connection_uris: {
          type: 'array',
          items: {
            type: 'object',
            required: ['connection_uri'],
            properties: {
              connection_uri: {
                description:
                  'Connection URI is same as specified in https://www.postgresql.org/docs/current/libpq-connect.html#id-1.7.3.8.3.6\nIt is a ready to use string for psql or for DATABASE_URL environment variable.\n',
                type: 'string',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateProjectBranchDatabase = {
  body: {
    type: 'object',
    required: ['database'],
    properties: {
      database: {
        type: 'object',
        required: ['name', 'owner_name'],
        properties: {
          name: { description: 'The name of the datbase\n', type: 'string', examples: ['mydb'] },
          owner_name: {
            description: 'The name of the role that owns the database\n',
            type: 'string',
            examples: ['casey'],
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      required: ['database', 'operations'],
      properties: {
        database: {
          type: 'object',
          required: ['id', 'branch_id', 'name', 'owner_name', 'created_at', 'updated_at'],
          properties: {
            id: {
              description: 'The database ID\n',
              type: 'integer',
              format: 'int64',
              examples: [834686],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_id: {
              description: 'The ID of the branch to which the database belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The database name\n', type: 'string', examples: ['neondb'] },
            owner_name: {
              description: 'The name of role that owns the database\n',
              type: 'string',
              examples: ['casey'],
            },
            created_at: {
              description: 'A timestamp indicating when the database was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the database was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: [834686],
              },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateProjectBranchRole = {
  body: {
    type: 'object',
    required: ['role'],
    properties: {
      role: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            description: 'The role name. Cannot exceed 63 bytes in length.\n',
            type: 'string',
            examples: ['sally'],
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      required: ['operations', 'role'],
      properties: {
        role: {
          type: 'object',
          required: ['branch_id', 'name', 'created_at', 'updated_at'],
          properties: {
            branch_id: {
              description: 'The ID of the branch to which the role belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The role name\n', type: 'string', examples: ['casey'] },
            password: { description: 'The role password\n', type: 'string' },
            protected: {
              description: 'Whether or not the role is system-protected\n',
              type: 'boolean',
            },
            created_at: {
              description: 'A timestamp indicating when the role was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the role was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: { description: 'The operation ID', type: 'string', format: 'uuid' },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateProjectEndpoint = {
  body: {
    type: 'object',
    required: ['endpoint'],
    properties: {
      endpoint: {
        type: 'object',
        required: ['branch_id', 'type', 'name'],
        properties: {
          branch_id: {
            description: 'The ID of the branch the compute endpoint will be associated with\n',
            type: 'string',
            examples: ['br-floral-mountain-251143'],
          },
          region_id: {
            description:
              "The region where the compute endpoint will be created. Only the project's `region_id` is permitted.\n",
            type: 'string',
          },
          type: {
            description:
              'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n',
            type: 'string',
            enum: ['read_only', 'read_write'],
            examples: ['read_write'],
          },
          settings: {
            type: 'object',
            description: 'A collection of settings for a compute endpoint',
            properties: {
              pg_settings: {
                description: 'A raw representation of PostgreSQL settings',
                type: 'object',
                additionalProperties: { type: 'string' },
              },
            },
          },
          autoscaling_limit_min_cu: {
            description: 'The minimum number of CPU units\n',
            type: 'number',
          },
          autoscaling_limit_max_cu: {
            description: 'The maximum number of CPU units\n',
            type: 'number',
          },
          provisioner: {
            type: 'string',
            description: 'The Neon compute provisioner.\n',
            enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
          },
          pooler_enabled: {
            description: 'Whether to enable connection pooling for the compute endpoint\n',
            type: 'boolean',
          },
          pooler_mode: {
            description:
              'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n',
            type: 'string',
            enum: ['transaction'],
          },
          disabled: {
            type: 'boolean',
            description: 'Whether to restrict connections to the compute endpoint\n',
          },
          passwordless_access: {
            type: 'boolean',
            description:
              'NOT YET IMPLEMENTED. Whether to permit passwordless access to the compute endpoint.\n',
          },
          suspend_timeout_seconds: {
            description:
              'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
            type: 'integer',
            format: 'int64',
            minimum: -1,
            maximum: 86400,
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      required: ['endpoint', 'operations'],
      properties: {
        endpoint: {
          type: 'object',
          required: [
            'host',
            'id',
            'project_id',
            'branch_id',
            'region_id',
            'autoscaling_limit_max_cu',
            'autoscaling_limit_min_cu',
            'type',
            'current_state',
            'pooler_enabled',
            'pooler_mode',
            'disabled',
            'passwordless_access',
            'creation_source',
            'created_at',
            'updated_at',
            'settings',
            'proxy_host',
            'suspend_timeout_seconds',
            'provisioner',
          ],
          properties: {
            host: {
              description:
                'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
            },
            id: {
              description:
                'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639'],
            },
            project_id: {
              description: 'The ID of the project to which the compute endpoint belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            branch_id: {
              description: 'The ID of the branch that the compute endpoint is associated with\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            autoscaling_limit_min_cu: {
              description: 'The minimum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            autoscaling_limit_max_cu: {
              description: 'The maximum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            region_id: {
              type: 'string',
              description: 'The region identifier\n',
              examples: ['aws-us-east-2'],
            },
            type: {
              description:
                'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
              type: 'string',
              enum: ['read_only', 'read_write'],
              examples: ['read_write'],
            },
            current_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['init'],
            },
            pending_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['active'],
            },
            settings: {
              type: 'object',
              description: 'A collection of settings for a compute endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            pooler_enabled: {
              description: 'Whether connection pooling is enabled for the compute endpoint\n',
              type: 'boolean',
            },
            pooler_mode: {
              description:
                'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
              type: 'string',
              enum: ['transaction'],
              examples: ['transaction'],
            },
            disabled: {
              description: 'Whether to restrict connections to the compute endpoint\n',
              type: 'boolean',
            },
            passwordless_access: {
              description: 'Whether to permit passwordless access to the compute endpoint\n',
              type: 'boolean',
              examples: [true],
            },
            last_active: {
              description: 'A timestamp indicating when the compute endpoint was last active\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The compute endpoint creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the compute endpoint was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the compute endpoint was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            proxy_host: {
              description: 'DEPRECATED. Use the "host" property instead.\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            suspend_timeout_seconds: {
              description:
                'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
              type: 'integer',
              format: 'int64',
              minimum: -1,
              maximum: 86400,
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteProject = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['project'],
      properties: {
        project: {
          type: 'object',
          required: [
            'consumption_period_end',
            'consumption_period_start',
            'active_time_seconds',
            'compute_time_seconds',
            'written_data_bytes',
            'data_transfer_bytes',
            'data_storage_bytes_hour',
            'id',
            'platform_id',
            'region_id',
            'name',
            'pg_version',
            'proxy_host',
            'branch_logical_size_limit',
            'branch_logical_size_limit_bytes',
            'store_passwords',
            'cpu_used_sec',
            'provisioner',
            'creation_source',
            'created_at',
            'updated_at',
            'owner_id',
          ],
          properties: {
            data_storage_bytes_hour: {
              description:
                'Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            data_transfer_bytes: {
              description:
                'Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            written_data_bytes: {
              description:
                'Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            compute_time_seconds: {
              description:
                "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n",
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            active_time_seconds: {
              description:
                'Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            cpu_used_sec: {
              description: 'DEPRECATED, use compute_time instead.\n',
              type: 'integer',
              format: 'int64',
              deprecated: true,
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            id: {
              description: 'The project ID\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            platform_id: {
              description:
                'The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n',
              type: 'string',
              examples: ['aws'],
            },
            region_id: {
              description: 'The region identifier\n',
              type: 'string',
              examples: ['aws-us-east-2'],
            },
            name: {
              description: 'The project name\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
              examples: ['k8s-pod'],
            },
            default_endpoint_settings: {
              type: 'object',
              description: 'A collection of settings for a Neon endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            settings: {
              type: 'object',
              properties: {
                quota: {
                  type: 'object',
                  description:
                    'The consumption quota of a project.\nAfter the quota has been exceeded, it is impossible to use the project until either:\n* Neon cloud resets the calculated consumption,\n* or the user increases quota for the project.\nThe Neon cloud resets the quota at the beginning of the billing period.\n\nIf the quota is not set, the project can use as many resources as needed.\n',
                  properties: {
                    active_time_sec: {
                      description:
                        "The total amount of wall-clock time allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                    cpu_quota_sec: {
                      description:
                        "The total amount of CPU seconds allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                  },
                },
              },
            },
            pg_version: {
              description:
                'The major PostgreSQL version number. Currently supported version are `14` and `15`.',
              type: 'integer',
              examples: [15],
            },
            proxy_host: {
              description:
                'The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            branch_logical_size_limit: {
              description: 'The logical size limit for a branch. The value is in MiB.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_logical_size_limit_bytes: {
              description: 'The logical size limit for a branch. The value is in B.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            store_passwords: {
              description:
                'Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n',
              type: 'boolean',
              examples: [true],
            },
            maintenance_starts_at: {
              description:
                'A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The project creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the project was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the project was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            synthetic_storage_size: {
              description:
                'Experimental. Do not use this field yet.\nThe data storage size in bytes.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            consumption_period_start: {
              description:
                'A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            consumption_period_end: {
              description:
                'A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            quota_reset_at: {
              deprecated: true,
              description:
                'DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets\n',
              type: 'string',
              format: 'date-time',
            },
            owner_id: { type: 'string' },
            owner: {
              type: 'object',
              required: ['email', 'branches_limit', 'subscription_type'],
              properties: {
                email: { type: 'string' },
                branches_limit: { type: 'integer' },
                subscription_type: {
                  type: 'string',
                  description:
                    'Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be "UNKNOWN"\n\n\n`UNKNOWN` `free` `pro` `platform_partnership` `enterprise`',
                  enum: ['UNKNOWN', 'free', 'pro', 'platform_partnership', 'enterprise'],
                },
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteProjectBranch = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['branch', 'operations'],
      properties: {
        branch: {
          type: 'object',
          required: [
            'id',
            'project_id',
            'name',
            'current_state',
            'creation_source',
            'created_at',
            'updated_at',
            'primary',
            'cpu_used_sec',
          ],
          properties: {
            id: {
              description:
                'The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            project_id: {
              description: 'The ID of the project to which the branch belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            parent_id: {
              description: 'The `branch_id` of the parent branch\n',
              type: 'string',
              examples: ['br-aged-salad-637688'],
            },
            parent_lsn: {
              description:
                'The Log Sequence Number (LSN) on the parent branch from which this branch was created\n',
              type: 'string',
              examples: ['0/1DE2850'],
            },
            parent_timestamp: {
              description:
                'The point in time on the parent branch from which this branch was created\n',
              type: 'string',
              format: 'date-time',
            },
            name: { description: 'The branch name\n', type: 'string', examples: ['dev2'] },
            current_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
              examples: ['ready'],
            },
            pending_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
            },
            logical_size: {
              description: 'The logical size of the branch, in bytes\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            creation_source: {
              description: 'The branch creation source\n',
              type: 'string',
              examples: ['console'],
            },
            primary: {
              description: "Whether the branch is the project's primary branch\n",
              type: 'boolean',
              examples: [true],
            },
            cpu_used_sec: {
              description:
                'CPU seconds used by all the endpoints of the branch, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            created_at: {
              description: 'A timestamp indicating when the branch was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T19:09:48Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the branch was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-01T19:53:05Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['br-wispy-meadow-118737'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: { description: 'The branch ID', type: 'string' },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T19:09:48Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-01T19:53:05Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteProjectBranchDatabase = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
          database_name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The database name',
          },
        },
        required: ['project_id', 'branch_id', 'database_name'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['database', 'operations'],
      properties: {
        database: {
          type: 'object',
          required: ['id', 'branch_id', 'name', 'owner_name', 'created_at', 'updated_at'],
          properties: {
            id: {
              description: 'The database ID\n',
              type: 'integer',
              format: 'int64',
              examples: [834686],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_id: {
              description: 'The ID of the branch to which the database belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The database name\n', type: 'string', examples: ['neondb'] },
            owner_name: {
              description: 'The name of role that owns the database\n',
              type: 'string',
              examples: ['casey'],
            },
            created_at: {
              description: 'A timestamp indicating when the database was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the database was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: [834686],
              },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteProjectBranchRole = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
          role_name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The role name',
          },
        },
        required: ['project_id', 'branch_id', 'role_name'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['operations', 'role'],
      properties: {
        role: {
          type: 'object',
          required: ['branch_id', 'name', 'created_at', 'updated_at'],
          properties: {
            branch_id: {
              description: 'The ID of the branch to which the role belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The role name\n', type: 'string', examples: ['casey'] },
            password: { description: 'The role password\n', type: 'string' },
            protected: {
              description: 'Whether or not the role is system-protected\n',
              type: 'boolean',
            },
            created_at: {
              description: 'A timestamp indicating when the role was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the role was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: { description: 'The operation ID', type: 'string', format: 'uuid' },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteProjectEndpoint = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          endpoint_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The endpoint ID',
          },
        },
        required: ['project_id', 'endpoint_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['endpoint', 'operations'],
      properties: {
        endpoint: {
          type: 'object',
          required: [
            'host',
            'id',
            'project_id',
            'branch_id',
            'region_id',
            'autoscaling_limit_max_cu',
            'autoscaling_limit_min_cu',
            'type',
            'current_state',
            'pooler_enabled',
            'pooler_mode',
            'disabled',
            'passwordless_access',
            'creation_source',
            'created_at',
            'updated_at',
            'settings',
            'proxy_host',
            'suspend_timeout_seconds',
            'provisioner',
          ],
          properties: {
            host: {
              description:
                'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
            },
            id: {
              description:
                'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639'],
            },
            project_id: {
              description: 'The ID of the project to which the compute endpoint belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            branch_id: {
              description: 'The ID of the branch that the compute endpoint is associated with\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            autoscaling_limit_min_cu: {
              description: 'The minimum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            autoscaling_limit_max_cu: {
              description: 'The maximum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            region_id: {
              type: 'string',
              description: 'The region identifier\n',
              examples: ['aws-us-east-2'],
            },
            type: {
              description:
                'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
              type: 'string',
              enum: ['read_only', 'read_write'],
              examples: ['read_write'],
            },
            current_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['init'],
            },
            pending_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['active'],
            },
            settings: {
              type: 'object',
              description: 'A collection of settings for a compute endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            pooler_enabled: {
              description: 'Whether connection pooling is enabled for the compute endpoint\n',
              type: 'boolean',
            },
            pooler_mode: {
              description:
                'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
              type: 'string',
              enum: ['transaction'],
              examples: ['transaction'],
            },
            disabled: {
              description: 'Whether to restrict connections to the compute endpoint\n',
              type: 'boolean',
            },
            passwordless_access: {
              description: 'Whether to permit passwordless access to the compute endpoint\n',
              type: 'boolean',
              examples: [true],
            },
            last_active: {
              description: 'A timestamp indicating when the compute endpoint was last active\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The compute endpoint creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the compute endpoint was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the compute endpoint was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            proxy_host: {
              description: 'DEPRECATED. Use the "host" property instead.\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            suspend_timeout_seconds: {
              description:
                'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
              type: 'integer',
              format: 'int64',
              minimum: -1,
              maximum: 86400,
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetProject = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['project'],
      properties: {
        project: {
          type: 'object',
          required: [
            'consumption_period_end',
            'consumption_period_start',
            'active_time_seconds',
            'compute_time_seconds',
            'written_data_bytes',
            'data_transfer_bytes',
            'data_storage_bytes_hour',
            'id',
            'platform_id',
            'region_id',
            'name',
            'pg_version',
            'proxy_host',
            'branch_logical_size_limit',
            'branch_logical_size_limit_bytes',
            'store_passwords',
            'cpu_used_sec',
            'provisioner',
            'creation_source',
            'created_at',
            'updated_at',
            'owner_id',
          ],
          properties: {
            data_storage_bytes_hour: {
              description:
                'Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            data_transfer_bytes: {
              description:
                'Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            written_data_bytes: {
              description:
                'Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            compute_time_seconds: {
              description:
                "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n",
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            active_time_seconds: {
              description:
                'Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            cpu_used_sec: {
              description: 'DEPRECATED, use compute_time instead.\n',
              type: 'integer',
              format: 'int64',
              deprecated: true,
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            id: {
              description: 'The project ID\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            platform_id: {
              description:
                'The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n',
              type: 'string',
              examples: ['aws'],
            },
            region_id: {
              description: 'The region identifier\n',
              type: 'string',
              examples: ['aws-us-east-2'],
            },
            name: {
              description: 'The project name\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
              examples: ['k8s-pod'],
            },
            default_endpoint_settings: {
              type: 'object',
              description: 'A collection of settings for a Neon endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            settings: {
              type: 'object',
              properties: {
                quota: {
                  type: 'object',
                  description:
                    'The consumption quota of a project.\nAfter the quota has been exceeded, it is impossible to use the project until either:\n* Neon cloud resets the calculated consumption,\n* or the user increases quota for the project.\nThe Neon cloud resets the quota at the beginning of the billing period.\n\nIf the quota is not set, the project can use as many resources as needed.\n',
                  properties: {
                    active_time_sec: {
                      description:
                        "The total amount of wall-clock time allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                    cpu_quota_sec: {
                      description:
                        "The total amount of CPU seconds allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                  },
                },
              },
            },
            pg_version: {
              description:
                'The major PostgreSQL version number. Currently supported version are `14` and `15`.',
              type: 'integer',
              examples: [15],
            },
            proxy_host: {
              description:
                'The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            branch_logical_size_limit: {
              description: 'The logical size limit for a branch. The value is in MiB.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_logical_size_limit_bytes: {
              description: 'The logical size limit for a branch. The value is in B.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            store_passwords: {
              description:
                'Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n',
              type: 'boolean',
              examples: [true],
            },
            maintenance_starts_at: {
              description:
                'A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The project creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the project was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the project was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            synthetic_storage_size: {
              description:
                'Experimental. Do not use this field yet.\nThe data storage size in bytes.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            consumption_period_start: {
              description:
                'A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            consumption_period_end: {
              description:
                'A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            quota_reset_at: {
              deprecated: true,
              description:
                'DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets\n',
              type: 'string',
              format: 'date-time',
            },
            owner_id: { type: 'string' },
            owner: {
              type: 'object',
              required: ['email', 'branches_limit', 'subscription_type'],
              properties: {
                email: { type: 'string' },
                branches_limit: { type: 'integer' },
                subscription_type: {
                  type: 'string',
                  description:
                    'Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be "UNKNOWN"\n\n\n`UNKNOWN` `free` `pro` `platform_partnership` `enterprise`',
                  enum: ['UNKNOWN', 'free', 'pro', 'platform_partnership', 'enterprise'],
                },
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetProjectBranch = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['branch'],
      properties: {
        branch: {
          type: 'object',
          required: [
            'id',
            'project_id',
            'name',
            'current_state',
            'creation_source',
            'created_at',
            'updated_at',
            'primary',
            'cpu_used_sec',
          ],
          properties: {
            id: {
              description:
                'The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            project_id: {
              description: 'The ID of the project to which the branch belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            parent_id: {
              description: 'The `branch_id` of the parent branch\n',
              type: 'string',
              examples: ['br-aged-salad-637688'],
            },
            parent_lsn: {
              description:
                'The Log Sequence Number (LSN) on the parent branch from which this branch was created\n',
              type: 'string',
              examples: ['0/1DE2850'],
            },
            parent_timestamp: {
              description:
                'The point in time on the parent branch from which this branch was created\n',
              type: 'string',
              format: 'date-time',
            },
            name: { description: 'The branch name\n', type: 'string', examples: ['dev2'] },
            current_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
              examples: ['ready'],
            },
            pending_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
            },
            logical_size: {
              description: 'The logical size of the branch, in bytes\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            creation_source: {
              description: 'The branch creation source\n',
              type: 'string',
              examples: ['console'],
            },
            primary: {
              description: "Whether the branch is the project's primary branch\n",
              type: 'boolean',
              examples: [true],
            },
            cpu_used_sec: {
              description:
                'CPU seconds used by all the endpoints of the branch, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            created_at: {
              description: 'A timestamp indicating when the branch was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T19:09:48Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the branch was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-01T19:53:05Z'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetProjectBranchDatabase = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
          database_name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The database name',
          },
        },
        required: ['project_id', 'branch_id', 'database_name'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['database'],
      properties: {
        database: {
          type: 'object',
          required: ['id', 'branch_id', 'name', 'owner_name', 'created_at', 'updated_at'],
          properties: {
            id: {
              description: 'The database ID\n',
              type: 'integer',
              format: 'int64',
              examples: [834686],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_id: {
              description: 'The ID of the branch to which the database belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The database name\n', type: 'string', examples: ['neondb'] },
            owner_name: {
              description: 'The name of role that owns the database\n',
              type: 'string',
              examples: ['casey'],
            },
            created_at: {
              description: 'A timestamp indicating when the database was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the database was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetProjectBranchRole = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
          role_name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The role name',
          },
        },
        required: ['project_id', 'branch_id', 'role_name'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['role'],
      properties: {
        role: {
          type: 'object',
          required: ['branch_id', 'name', 'created_at', 'updated_at'],
          properties: {
            branch_id: {
              description: 'The ID of the branch to which the role belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The role name\n', type: 'string', examples: ['casey'] },
            password: { description: 'The role password\n', type: 'string' },
            protected: {
              description: 'Whether or not the role is system-protected\n',
              type: 'boolean',
            },
            created_at: {
              description: 'A timestamp indicating when the role was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the role was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetProjectBranchRolePassword = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
          role_name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The role name',
          },
        },
        required: ['project_id', 'branch_id', 'role_name'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['password'],
      properties: { password: { description: 'The role password\n', type: 'string' } },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '412': {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetProjectEndpoint = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          endpoint_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The endpoint ID',
          },
        },
        required: ['project_id', 'endpoint_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['endpoint'],
      properties: {
        endpoint: {
          type: 'object',
          required: [
            'host',
            'id',
            'project_id',
            'branch_id',
            'region_id',
            'autoscaling_limit_max_cu',
            'autoscaling_limit_min_cu',
            'type',
            'current_state',
            'pooler_enabled',
            'pooler_mode',
            'disabled',
            'passwordless_access',
            'creation_source',
            'created_at',
            'updated_at',
            'settings',
            'proxy_host',
            'suspend_timeout_seconds',
            'provisioner',
          ],
          properties: {
            host: {
              description:
                'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
            },
            id: {
              description:
                'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639'],
            },
            project_id: {
              description: 'The ID of the project to which the compute endpoint belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            branch_id: {
              description: 'The ID of the branch that the compute endpoint is associated with\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            autoscaling_limit_min_cu: {
              description: 'The minimum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            autoscaling_limit_max_cu: {
              description: 'The maximum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            region_id: {
              type: 'string',
              description: 'The region identifier\n',
              examples: ['aws-us-east-2'],
            },
            type: {
              description:
                'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
              type: 'string',
              enum: ['read_only', 'read_write'],
              examples: ['read_write'],
            },
            current_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['init'],
            },
            pending_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['active'],
            },
            settings: {
              type: 'object',
              description: 'A collection of settings for a compute endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            pooler_enabled: {
              description: 'Whether connection pooling is enabled for the compute endpoint\n',
              type: 'boolean',
            },
            pooler_mode: {
              description:
                'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
              type: 'string',
              enum: ['transaction'],
              examples: ['transaction'],
            },
            disabled: {
              description: 'Whether to restrict connections to the compute endpoint\n',
              type: 'boolean',
            },
            passwordless_access: {
              description: 'Whether to permit passwordless access to the compute endpoint\n',
              type: 'boolean',
              examples: [true],
            },
            last_active: {
              description: 'A timestamp indicating when the compute endpoint was last active\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The compute endpoint creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the compute endpoint was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the compute endpoint was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            proxy_host: {
              description: 'DEPRECATED. Use the "host" property instead.\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            suspend_timeout_seconds: {
              description:
                'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
              type: 'integer',
              format: 'int64',
              minimum: -1,
              maximum: 86400,
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetProjectOperation = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          operation_id: {
            type: 'string',
            format: 'uuid',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The operation ID',
          },
        },
        required: ['project_id', 'operation_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['operation'],
      properties: {
        operation: {
          type: 'object',
          required: [
            'id',
            'project_id',
            'action',
            'status',
            'failures_count',
            'created_at',
            'updated_at',
          ],
          properties: {
            id: { description: 'The operation ID', type: 'string', format: 'uuid' },
            project_id: { description: 'The Neon project ID', type: 'string' },
            branch_id: { description: 'The branch ID', type: 'string' },
            endpoint_id: { description: 'The endpoint ID', type: 'string' },
            action: {
              description:
                'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
              type: 'string',
              enum: [
                'create_compute',
                'create_timeline',
                'start_compute',
                'suspend_compute',
                'apply_config',
                'check_availability',
                'delete_timeline',
                'create_branch',
                'tenant_migrate',
                'tenant_detach',
                'tenant_reattach',
                'replace_safekeeper',
              ],
            },
            status: {
              description:
                'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
              type: 'string',
              enum: ['running', 'finished', 'failed', 'scheduling'],
            },
            error: { description: 'The error that occured', type: 'string' },
            failures_count: {
              description: 'The number of times the operation failed',
              type: 'integer',
              format: 'int32',
              minimum: -2147483648,
              maximum: 2147483647,
            },
            retry_at: {
              description: 'A timestamp indicating when the operation was last retried',
              type: 'string',
              format: 'date-time',
            },
            created_at: {
              description: 'A timestamp indicating when the operation was created',
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              description: 'A timestamp indicating when the operation status was last updated',
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListApiKeys = {
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        required: ['last_used_from_addr', 'id', 'name', 'created_at'],
        properties: {
          id: {
            description: 'The API key ID',
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
          },
          name: { description: 'The user-specified API key name', type: 'string' },
          created_at: {
            description: 'A timestamp indicating when the API key was created',
            type: 'string',
            format: 'date-time',
          },
          last_used_at: {
            description: 'A timestamp indicating when the API was last used',
            type: 'string',
            format: 'date-time',
          },
          last_used_from_addr: {
            description: 'The IP address from which the API key was last used',
            type: 'string',
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjectBranchDatabases = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['databases'],
      properties: {
        databases: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'branch_id', 'name', 'owner_name', 'created_at', 'updated_at'],
            properties: {
              id: {
                description: 'The database ID\n',
                type: 'integer',
                format: 'int64',
                examples: [834686],
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              branch_id: {
                description: 'The ID of the branch to which the database belongs\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              name: { description: 'The database name\n', type: 'string', examples: ['neondb'] },
              owner_name: {
                description: 'The name of role that owns the database\n',
                type: 'string',
                examples: ['casey'],
              },
              created_at: {
                description: 'A timestamp indicating when the database was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the database was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjectBranchEndpoints = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['endpoints'],
      properties: {
        endpoints: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'host',
              'id',
              'project_id',
              'branch_id',
              'region_id',
              'autoscaling_limit_max_cu',
              'autoscaling_limit_min_cu',
              'type',
              'current_state',
              'pooler_enabled',
              'pooler_mode',
              'disabled',
              'passwordless_access',
              'creation_source',
              'created_at',
              'updated_at',
              'settings',
              'proxy_host',
              'suspend_timeout_seconds',
              'provisioner',
            ],
            properties: {
              host: {
                description:
                  'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
              },
              id: {
                description:
                  'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The ID of the project to which the compute endpoint belongs\n',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The ID of the branch that the compute endpoint is associated with\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              autoscaling_limit_min_cu: {
                description: 'The minimum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              autoscaling_limit_max_cu: {
                description: 'The maximum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              region_id: {
                type: 'string',
                description: 'The region identifier\n',
                examples: ['aws-us-east-2'],
              },
              type: {
                description:
                  'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
                type: 'string',
                enum: ['read_only', 'read_write'],
                examples: ['read_write'],
              },
              current_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['init'],
              },
              pending_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['active'],
              },
              settings: {
                type: 'object',
                description: 'A collection of settings for a compute endpoint',
                properties: {
                  pg_settings: {
                    description: 'A raw representation of PostgreSQL settings',
                    type: 'object',
                    additionalProperties: { type: 'string' },
                  },
                },
              },
              pooler_enabled: {
                description: 'Whether connection pooling is enabled for the compute endpoint\n',
                type: 'boolean',
              },
              pooler_mode: {
                description:
                  'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
                type: 'string',
                enum: ['transaction'],
                examples: ['transaction'],
              },
              disabled: {
                description: 'Whether to restrict connections to the compute endpoint\n',
                type: 'boolean',
              },
              passwordless_access: {
                description: 'Whether to permit passwordless access to the compute endpoint\n',
                type: 'boolean',
                examples: [true],
              },
              last_active: {
                description: 'A timestamp indicating when the compute endpoint was last active\n',
                type: 'string',
                format: 'date-time',
              },
              creation_source: {
                description: 'The compute endpoint creation source\n',
                type: 'string',
                examples: ['console'],
              },
              created_at: {
                description: 'A timestamp indicating when the compute endpoint was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the compute endpoint was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              proxy_host: {
                description: 'DEPRECATED. Use the "host" property instead.\n',
                type: 'string',
                examples: ['us-east-2.aws.neon.tech'],
              },
              suspend_timeout_seconds: {
                description:
                  'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
                type: 'integer',
                format: 'int64',
                minimum: -1,
                maximum: 86400,
              },
              provisioner: {
                type: 'string',
                description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
                enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjectBranchRoles = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['roles'],
      properties: {
        roles: {
          type: 'array',
          items: {
            type: 'object',
            required: ['branch_id', 'name', 'created_at', 'updated_at'],
            properties: {
              branch_id: {
                description: 'The ID of the branch to which the role belongs\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              name: { description: 'The role name\n', type: 'string', examples: ['casey'] },
              password: { description: 'The role password\n', type: 'string' },
              protected: {
                description: 'Whether or not the role is system-protected\n',
                type: 'boolean',
              },
              created_at: {
                description: 'A timestamp indicating when the role was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the role was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjectBranches = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['branches'],
      properties: {
        branches: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'name',
              'current_state',
              'creation_source',
              'created_at',
              'updated_at',
              'primary',
              'cpu_used_sec',
            ],
            properties: {
              id: {
                description:
                  'The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              project_id: {
                description: 'The ID of the project to which the branch belongs\n',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              parent_id: {
                description: 'The `branch_id` of the parent branch\n',
                type: 'string',
                examples: ['br-aged-salad-637688'],
              },
              parent_lsn: {
                description:
                  'The Log Sequence Number (LSN) on the parent branch from which this branch was created\n',
                type: 'string',
                examples: ['0/1DE2850'],
              },
              parent_timestamp: {
                description:
                  'The point in time on the parent branch from which this branch was created\n',
                type: 'string',
                format: 'date-time',
              },
              name: { description: 'The branch name\n', type: 'string', examples: ['dev2'] },
              current_state: {
                description: 'The branch state\n\n`init` `ready`',
                type: 'string',
                enum: ['init', 'ready'],
                examples: ['ready'],
              },
              pending_state: {
                description: 'The branch state\n\n`init` `ready`',
                type: 'string',
                enum: ['init', 'ready'],
              },
              logical_size: {
                description: 'The logical size of the branch, in bytes\n',
                type: 'integer',
                format: 'int64',
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              creation_source: {
                description: 'The branch creation source\n',
                type: 'string',
                examples: ['console'],
              },
              primary: {
                description: "Whether the branch is the project's primary branch\n",
                type: 'boolean',
                examples: [true],
              },
              cpu_used_sec: {
                description:
                  'CPU seconds used by all the endpoints of the branch, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n',
                type: 'integer',
                format: 'int64',
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              created_at: {
                description: 'A timestamp indicating when the branch was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T19:09:48Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the branch was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-01T19:53:05Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjectEndpoints = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['endpoints'],
      properties: {
        endpoints: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'host',
              'id',
              'project_id',
              'branch_id',
              'region_id',
              'autoscaling_limit_max_cu',
              'autoscaling_limit_min_cu',
              'type',
              'current_state',
              'pooler_enabled',
              'pooler_mode',
              'disabled',
              'passwordless_access',
              'creation_source',
              'created_at',
              'updated_at',
              'settings',
              'proxy_host',
              'suspend_timeout_seconds',
              'provisioner',
            ],
            properties: {
              host: {
                description:
                  'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
              },
              id: {
                description:
                  'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
                type: 'string',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The ID of the project to which the compute endpoint belongs\n',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The ID of the branch that the compute endpoint is associated with\n',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              autoscaling_limit_min_cu: {
                description: 'The minimum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              autoscaling_limit_max_cu: {
                description: 'The maximum number of CPU units\n',
                type: 'number',
                examples: [1],
              },
              region_id: {
                type: 'string',
                description: 'The region identifier\n',
                examples: ['aws-us-east-2'],
              },
              type: {
                description:
                  'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
                type: 'string',
                enum: ['read_only', 'read_write'],
                examples: ['read_write'],
              },
              current_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['init'],
              },
              pending_state: {
                description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
                type: 'string',
                enum: ['init', 'active', 'idle'],
                examples: ['active'],
              },
              settings: {
                type: 'object',
                description: 'A collection of settings for a compute endpoint',
                properties: {
                  pg_settings: {
                    description: 'A raw representation of PostgreSQL settings',
                    type: 'object',
                    additionalProperties: { type: 'string' },
                  },
                },
              },
              pooler_enabled: {
                description: 'Whether connection pooling is enabled for the compute endpoint\n',
                type: 'boolean',
              },
              pooler_mode: {
                description:
                  'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
                type: 'string',
                enum: ['transaction'],
                examples: ['transaction'],
              },
              disabled: {
                description: 'Whether to restrict connections to the compute endpoint\n',
                type: 'boolean',
              },
              passwordless_access: {
                description: 'Whether to permit passwordless access to the compute endpoint\n',
                type: 'boolean',
                examples: [true],
              },
              last_active: {
                description: 'A timestamp indicating when the compute endpoint was last active\n',
                type: 'string',
                format: 'date-time',
              },
              creation_source: {
                description: 'The compute endpoint creation source\n',
                type: 'string',
                examples: ['console'],
              },
              created_at: {
                description: 'A timestamp indicating when the compute endpoint was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the compute endpoint was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              proxy_host: {
                description: 'DEPRECATED. Use the "host" property instead.\n',
                type: 'string',
                examples: ['us-east-2.aws.neon.tech'],
              },
              suspend_timeout_seconds: {
                description:
                  'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
                type: 'integer',
                format: 'int64',
                minimum: -1,
                maximum: 86400,
              },
              provisioner: {
                type: 'string',
                description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
                enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjectOperations = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
      {
        type: 'object',
        properties: {
          cursor: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Specify the cursor value from the previous response to get the next batch of operations',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: 1000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Specify a value from 1 to 1000 to limit number of operations in the response',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['operations'],
      properties: {
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: { description: 'The operation ID', type: 'string', format: 'uuid' },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: { description: 'The branch ID', type: 'string' },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
        pagination: {
          description:
            'Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n',
          type: 'object',
          required: ['cursor', 'limit'],
          properties: {
            cursor: { type: 'string', minLength: 1, examples: ['2022-12-07T00:45:05.262011Z'] },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjects = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          cursor: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Specify the cursor value from the previous response to get the next batch of projects.',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            default: 10,
            maximum: 100,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Specify a value from 1 to 100 to limit number of projects in the response.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['projects'],
      properties: {
        projects: {
          type: 'array',
          items: {
            description:
              'Essential data about the project. Full data is available at the getProject endpoint.\n',
            type: 'object',
            required: [
              'active_time',
              'id',
              'platform_id',
              'region_id',
              'name',
              'pg_version',
              'proxy_host',
              'branch_logical_size_limit',
              'branch_logical_size_limit_bytes',
              'provisioner',
              'store_passwords',
              'cpu_used_sec',
              'creation_source',
              'created_at',
              'updated_at',
              'owner_id',
            ],
            properties: {
              id: {
                description: 'The project ID\n',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              platform_id: {
                description:
                  'The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n',
                type: 'string',
                examples: ['aws'],
              },
              region_id: {
                description: 'The region identifier\n',
                type: 'string',
                examples: ['aws-us-east-2'],
              },
              name: {
                description: 'The project name\n',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              provisioner: {
                type: 'string',
                description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
                enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
                examples: ['k8s-pod'],
              },
              default_endpoint_settings: {
                type: 'object',
                description: 'A collection of settings for a Neon endpoint',
                properties: {
                  pg_settings: {
                    description: 'A raw representation of PostgreSQL settings',
                    type: 'object',
                    additionalProperties: { type: 'string' },
                  },
                },
              },
              settings: {
                type: 'object',
                properties: {
                  quota: {
                    type: 'object',
                    description:
                      'The consumption quota of a project.\nAfter the quota has been exceeded, it is impossible to use the project until either:\n* Neon cloud resets the calculated consumption,\n* or the user increases quota for the project.\nThe Neon cloud resets the quota at the beginning of the billing period.\n\nIf the quota is not set, the project can use as many resources as needed.\n',
                    properties: {
                      active_time_sec: {
                        description:
                          "The total amount of wall-clock time allowed to be spent by a project's compute endpoints.\n",
                        type: 'integer',
                        format: 'int64',
                        minimum: 0,
                        maximum: 9223372036854776000,
                      },
                      cpu_quota_sec: {
                        description:
                          "The total amount of CPU seconds allowed to be spent by a project's compute endpoints.\n",
                        type: 'integer',
                        format: 'int64',
                        minimum: 0,
                        maximum: 9223372036854776000,
                      },
                    },
                  },
                },
              },
              pg_version: {
                description:
                  'The major PostgreSQL version number. Currently supported version are `14` and `15`.',
                type: 'integer',
                examples: [15],
              },
              proxy_host: {
                description:
                  'The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n',
                type: 'string',
                examples: ['us-east-2.aws.neon.tech'],
              },
              branch_logical_size_limit: {
                description: 'The logical size limit for a branch. The value is in MiB.\n',
                type: 'integer',
                format: 'int64',
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              branch_logical_size_limit_bytes: {
                description: 'The logical size limit for a branch. The value is in B.\n',
                type: 'integer',
                format: 'int64',
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              store_passwords: {
                description:
                  'Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n',
                type: 'boolean',
                examples: [true],
              },
              active_time: {
                description:
                  'Control plane observed endpoints of this project being active this amount of wall-clock time.\n',
                type: 'integer',
                format: 'int64',
                minimum: 0,
                maximum: 9223372036854776000,
              },
              cpu_used_sec: {
                deprecated: true,
                description: 'DEPRECATED, use data from the getProject endpoint instead.\n',
                type: 'integer',
                format: 'int64',
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              maintenance_starts_at: {
                description:
                  'A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n',
                type: 'string',
                format: 'date-time',
              },
              creation_source: {
                description: 'The project creation source\n',
                type: 'string',
                examples: ['console'],
              },
              created_at: {
                description: 'A timestamp indicating when the project was created\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-13T01:30:55Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the project was last updated\n',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-13T01:30:55Z'],
              },
              synthetic_storage_size: {
                description:
                  'Experimental. Do not use this field yet.\nThe data storage size in bytes.\n',
                type: 'integer',
                format: 'int64',
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              quota_reset_at: {
                deprecated: true,
                description:
                  'DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets\n',
                type: 'string',
                format: 'date-time',
              },
              owner_id: { type: 'string' },
              owner: {
                type: 'object',
                required: ['email', 'branches_limit', 'subscription_type'],
                properties: {
                  email: { type: 'string' },
                  branches_limit: { type: 'integer' },
                  subscription_type: {
                    type: 'string',
                    description:
                      'Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be "UNKNOWN"\n\n\n`UNKNOWN` `free` `pro` `platform_partnership` `enterprise`',
                    enum: ['UNKNOWN', 'free', 'pro', 'platform_partnership', 'enterprise'],
                  },
                },
              },
            },
          },
        },
        pagination: {
          description:
            'Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n',
          type: 'object',
          required: ['cursor', 'limit'],
          properties: {
            cursor: { type: 'string', minLength: 1, examples: ['2022-12-07T00:45:05.262011Z'] },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ListProjectsConsumption = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          cursor: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Specify the cursor value from the previous response to get the next batch of projects.',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            default: 10,
            maximum: 1000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Specify a value from 1 to 1000 to limit number of projects in the response.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['projects'],
      properties: {
        projects: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'active_time_seconds',
              'compute_time_seconds',
              'written_data_bytes',
              'data_transfer_bytes',
              'data_storage_bytes_hour',
              'updated_at',
            ],
            properties: {
              id: { description: 'The project ID\n', type: 'string' },
              data_storage_bytes_hour: {
                description:
                  'Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n',
                type: 'integer',
                format: 'int64',
                minimum: 0,
                maximum: 9223372036854776000,
              },
              data_transfer_bytes: {
                description:
                  'Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n',
                type: 'integer',
                format: 'int64',
                minimum: 0,
                maximum: 9223372036854776000,
              },
              written_data_bytes: {
                description:
                  'Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n',
                type: 'integer',
                format: 'int64',
                minimum: 0,
                maximum: 9223372036854776000,
              },
              compute_time_seconds: {
                description:
                  "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n",
                type: 'integer',
                format: 'int64',
                minimum: 0,
                maximum: 9223372036854776000,
              },
              active_time_seconds: {
                description:
                  'Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n',
                type: 'integer',
                format: 'int64',
                minimum: 0,
                maximum: 9223372036854776000,
              },
              updated_at: {
                description: 'A timestamp indicating when the project was last updated\n',
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
        pagination: {
          description:
            'Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n',
          type: 'object',
          required: ['cursor', 'limit'],
          properties: {
            cursor: { type: 'string', minLength: 1, examples: ['2022-12-07T00:45:05.262011Z'] },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const ResetProjectBranchRolePassword = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
          role_name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The role nam',
          },
        },
        required: ['project_id', 'branch_id', 'role_name'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['operations', 'role'],
      properties: {
        role: {
          type: 'object',
          required: ['branch_id', 'name', 'created_at', 'updated_at'],
          properties: {
            branch_id: {
              description: 'The ID of the branch to which the role belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The role name\n', type: 'string', examples: ['casey'] },
            password: { description: 'The role password\n', type: 'string' },
            protected: {
              description: 'Whether or not the role is system-protected\n',
              type: 'boolean',
            },
            created_at: {
              description: 'A timestamp indicating when the role was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the role was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-23T17:42:25Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: { description: 'The operation ID', type: 'string', format: 'uuid' },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-23T17:42:25Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const RevokeApiKey = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          key_id: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The API key ID',
          },
        },
        required: ['key_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['id', 'name', 'revoked', 'last_used_from_addr'],
      properties: {
        id: {
          description: 'The API key ID',
          type: 'integer',
          format: 'int64',
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        name: { description: 'The user-specified API key name', type: 'string' },
        revoked: {
          description: 'A `true` or `false` value indicating whether the API key is revoked',
          type: 'boolean',
        },
        last_used_at: {
          description: 'A timestamp indicating when the API was last used',
          type: 'string',
          format: 'date-time',
        },
        last_used_from_addr: {
          description: 'The IP address from which the API key was last used',
          type: 'string',
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const SetPrimaryProjectBranch = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['branch', 'operations'],
      properties: {
        branch: {
          type: 'object',
          required: [
            'id',
            'project_id',
            'name',
            'current_state',
            'creation_source',
            'created_at',
            'updated_at',
            'primary',
            'cpu_used_sec',
          ],
          properties: {
            id: {
              description:
                'The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            project_id: {
              description: 'The ID of the project to which the branch belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            parent_id: {
              description: 'The `branch_id` of the parent branch\n',
              type: 'string',
              examples: ['br-aged-salad-637688'],
            },
            parent_lsn: {
              description:
                'The Log Sequence Number (LSN) on the parent branch from which this branch was created\n',
              type: 'string',
              examples: ['0/1DE2850'],
            },
            parent_timestamp: {
              description:
                'The point in time on the parent branch from which this branch was created\n',
              type: 'string',
              format: 'date-time',
            },
            name: { description: 'The branch name\n', type: 'string', examples: ['dev2'] },
            current_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
              examples: ['ready'],
            },
            pending_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
            },
            logical_size: {
              description: 'The logical size of the branch, in bytes\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            creation_source: {
              description: 'The branch creation source\n',
              type: 'string',
              examples: ['console'],
            },
            primary: {
              description: "Whether the branch is the project's primary branch\n",
              type: 'boolean',
              examples: [true],
            },
            cpu_used_sec: {
              description:
                'CPU seconds used by all the endpoints of the branch, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            created_at: {
              description: 'A timestamp indicating when the branch was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T19:09:48Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the branch was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-01T19:53:05Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['br-wispy-meadow-118737'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: { description: 'The branch ID', type: 'string' },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T19:09:48Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-01T19:53:05Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const StartProjectEndpoint = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          endpoint_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The endpoint ID',
          },
        },
        required: ['project_id', 'endpoint_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['endpoint', 'operations'],
      properties: {
        endpoint: {
          type: 'object',
          required: [
            'host',
            'id',
            'project_id',
            'branch_id',
            'region_id',
            'autoscaling_limit_max_cu',
            'autoscaling_limit_min_cu',
            'type',
            'current_state',
            'pooler_enabled',
            'pooler_mode',
            'disabled',
            'passwordless_access',
            'creation_source',
            'created_at',
            'updated_at',
            'settings',
            'proxy_host',
            'suspend_timeout_seconds',
            'provisioner',
          ],
          properties: {
            host: {
              description:
                'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
            },
            id: {
              description:
                'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639'],
            },
            project_id: {
              description: 'The ID of the project to which the compute endpoint belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            branch_id: {
              description: 'The ID of the branch that the compute endpoint is associated with\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            autoscaling_limit_min_cu: {
              description: 'The minimum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            autoscaling_limit_max_cu: {
              description: 'The maximum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            region_id: {
              type: 'string',
              description: 'The region identifier\n',
              examples: ['aws-us-east-2'],
            },
            type: {
              description:
                'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
              type: 'string',
              enum: ['read_only', 'read_write'],
              examples: ['read_write'],
            },
            current_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['init'],
            },
            pending_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['active'],
            },
            settings: {
              type: 'object',
              description: 'A collection of settings for a compute endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            pooler_enabled: {
              description: 'Whether connection pooling is enabled for the compute endpoint\n',
              type: 'boolean',
            },
            pooler_mode: {
              description:
                'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
              type: 'string',
              enum: ['transaction'],
              examples: ['transaction'],
            },
            disabled: {
              description: 'Whether to restrict connections to the compute endpoint\n',
              type: 'boolean',
            },
            passwordless_access: {
              description: 'Whether to permit passwordless access to the compute endpoint\n',
              type: 'boolean',
              examples: [true],
            },
            last_active: {
              description: 'A timestamp indicating when the compute endpoint was last active\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The compute endpoint creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the compute endpoint was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the compute endpoint was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            proxy_host: {
              description: 'DEPRECATED. Use the "host" property instead.\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            suspend_timeout_seconds: {
              description:
                'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
              type: 'integer',
              format: 'int64',
              minimum: -1,
              maximum: 86400,
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const SuspendProjectEndpoint = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          endpoint_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The endpoint ID',
          },
        },
        required: ['project_id', 'endpoint_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['endpoint', 'operations'],
      properties: {
        endpoint: {
          type: 'object',
          required: [
            'host',
            'id',
            'project_id',
            'branch_id',
            'region_id',
            'autoscaling_limit_max_cu',
            'autoscaling_limit_min_cu',
            'type',
            'current_state',
            'pooler_enabled',
            'pooler_mode',
            'disabled',
            'passwordless_access',
            'creation_source',
            'created_at',
            'updated_at',
            'settings',
            'proxy_host',
            'suspend_timeout_seconds',
            'provisioner',
          ],
          properties: {
            host: {
              description:
                'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
            },
            id: {
              description:
                'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639'],
            },
            project_id: {
              description: 'The ID of the project to which the compute endpoint belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            branch_id: {
              description: 'The ID of the branch that the compute endpoint is associated with\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            autoscaling_limit_min_cu: {
              description: 'The minimum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            autoscaling_limit_max_cu: {
              description: 'The maximum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            region_id: {
              type: 'string',
              description: 'The region identifier\n',
              examples: ['aws-us-east-2'],
            },
            type: {
              description:
                'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
              type: 'string',
              enum: ['read_only', 'read_write'],
              examples: ['read_write'],
            },
            current_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['init'],
            },
            pending_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['active'],
            },
            settings: {
              type: 'object',
              description: 'A collection of settings for a compute endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            pooler_enabled: {
              description: 'Whether connection pooling is enabled for the compute endpoint\n',
              type: 'boolean',
            },
            pooler_mode: {
              description:
                'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
              type: 'string',
              enum: ['transaction'],
              examples: ['transaction'],
            },
            disabled: {
              description: 'Whether to restrict connections to the compute endpoint\n',
              type: 'boolean',
            },
            passwordless_access: {
              description: 'Whether to permit passwordless access to the compute endpoint\n',
              type: 'boolean',
              examples: [true],
            },
            last_active: {
              description: 'A timestamp indicating when the compute endpoint was last active\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The compute endpoint creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the compute endpoint was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the compute endpoint was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            proxy_host: {
              description: 'DEPRECATED. Use the "host" property instead.\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            suspend_timeout_seconds: {
              description:
                'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
              type: 'integer',
              format: 'int64',
              minimum: -1,
              maximum: 86400,
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UpdateProject = {
  body: {
    type: 'object',
    required: ['project'],
    properties: {
      project: {
        type: 'object',
        properties: {
          settings: {
            type: 'object',
            properties: {
              quota: {
                type: 'object',
                description:
                  'The consumption quota of a project.\nAfter the quota has been exceeded, it is impossible to use the project until either:\n* Neon cloud resets the calculated consumption,\n* or the user increases quota for the project.\nThe Neon cloud resets the quota at the beginning of the billing period.\n\nIf the quota is not set, the project can use as many resources as needed.\n',
                properties: {
                  active_time_sec: {
                    description:
                      "The total amount of wall-clock time allowed to be spent by a project's compute endpoints.\n",
                    type: 'integer',
                    format: 'int64',
                    minimum: 0,
                    maximum: 9223372036854776000,
                  },
                  cpu_quota_sec: {
                    description:
                      "The total amount of CPU seconds allowed to be spent by a project's compute endpoints.\n",
                    type: 'integer',
                    format: 'int64',
                    minimum: 0,
                    maximum: 9223372036854776000,
                  },
                },
              },
            },
          },
          name: { type: 'string', examples: ['myproject'] },
          default_endpoint_settings: {
            description: 'A raw representation of PostgreSQL settings',
            type: 'object',
            additionalProperties: { type: 'string' },
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
        },
        required: ['project_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['operations', 'project'],
      properties: {
        project: {
          type: 'object',
          required: [
            'consumption_period_end',
            'consumption_period_start',
            'active_time_seconds',
            'compute_time_seconds',
            'written_data_bytes',
            'data_transfer_bytes',
            'data_storage_bytes_hour',
            'id',
            'platform_id',
            'region_id',
            'name',
            'pg_version',
            'proxy_host',
            'branch_logical_size_limit',
            'branch_logical_size_limit_bytes',
            'store_passwords',
            'cpu_used_sec',
            'provisioner',
            'creation_source',
            'created_at',
            'updated_at',
            'owner_id',
          ],
          properties: {
            data_storage_bytes_hour: {
              description:
                'Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            data_transfer_bytes: {
              description:
                'Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            written_data_bytes: {
              description:
                'Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            compute_time_seconds: {
              description:
                "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n",
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            active_time_seconds: {
              description:
                'Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n',
              type: 'integer',
              format: 'int64',
              minimum: 0,
              maximum: 9223372036854776000,
            },
            cpu_used_sec: {
              description: 'DEPRECATED, use compute_time instead.\n',
              type: 'integer',
              format: 'int64',
              deprecated: true,
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            id: {
              description: 'The project ID\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            platform_id: {
              description:
                'The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n',
              type: 'string',
              examples: ['aws'],
            },
            region_id: {
              description: 'The region identifier\n',
              type: 'string',
              examples: ['aws-us-east-2'],
            },
            name: {
              description: 'The project name\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
              examples: ['k8s-pod'],
            },
            default_endpoint_settings: {
              type: 'object',
              description: 'A collection of settings for a Neon endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            settings: {
              type: 'object',
              properties: {
                quota: {
                  type: 'object',
                  description:
                    'The consumption quota of a project.\nAfter the quota has been exceeded, it is impossible to use the project until either:\n* Neon cloud resets the calculated consumption,\n* or the user increases quota for the project.\nThe Neon cloud resets the quota at the beginning of the billing period.\n\nIf the quota is not set, the project can use as many resources as needed.\n',
                  properties: {
                    active_time_sec: {
                      description:
                        "The total amount of wall-clock time allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                    cpu_quota_sec: {
                      description:
                        "The total amount of CPU seconds allowed to be spent by a project's compute endpoints.\n",
                      type: 'integer',
                      format: 'int64',
                      minimum: 0,
                      maximum: 9223372036854776000,
                    },
                  },
                },
              },
            },
            pg_version: {
              description:
                'The major PostgreSQL version number. Currently supported version are `14` and `15`.',
              type: 'integer',
              examples: [15],
            },
            proxy_host: {
              description:
                'The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            branch_logical_size_limit: {
              description: 'The logical size limit for a branch. The value is in MiB.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_logical_size_limit_bytes: {
              description: 'The logical size limit for a branch. The value is in B.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            store_passwords: {
              description:
                'Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n',
              type: 'boolean',
              examples: [true],
            },
            maintenance_starts_at: {
              description:
                'A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The project creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the project was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the project was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-13T01:30:55Z'],
            },
            synthetic_storage_size: {
              description:
                'Experimental. Do not use this field yet.\nThe data storage size in bytes.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            consumption_period_start: {
              description:
                'A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            consumption_period_end: {
              description:
                'A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n',
              type: 'string',
              format: 'date-time',
            },
            quota_reset_at: {
              deprecated: true,
              description:
                'DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets\n',
              type: 'string',
              format: 'date-time',
            },
            owner_id: { type: 'string' },
            owner: {
              type: 'object',
              required: ['email', 'branches_limit', 'subscription_type'],
              properties: {
                email: { type: 'string' },
                branches_limit: { type: 'integer' },
                subscription_type: {
                  type: 'string',
                  description:
                    'Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be "UNKNOWN"\n\n\n`UNKNOWN` `free` `pro` `platform_partnership` `enterprise`',
                  enum: ['UNKNOWN', 'free', 'pro', 'platform_partnership', 'enterprise'],
                },
              },
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['spring-example-302709'],
              },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: { description: 'The branch ID', type: 'string' },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-13T01:30:55Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-13T01:30:55Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UpdateProjectBranch = {
  body: {
    type: 'object',
    required: ['branch'],
    properties: {
      branch: { type: 'object', properties: { name: { type: 'string', examples: ['mybranch'] } } },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
        },
        required: ['project_id', 'branch_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['branch', 'operations'],
      properties: {
        branch: {
          type: 'object',
          required: [
            'id',
            'project_id',
            'name',
            'current_state',
            'creation_source',
            'created_at',
            'updated_at',
            'primary',
            'cpu_used_sec',
          ],
          properties: {
            id: {
              description:
                'The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            project_id: {
              description: 'The ID of the project to which the branch belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            parent_id: {
              description: 'The `branch_id` of the parent branch\n',
              type: 'string',
              examples: ['br-aged-salad-637688'],
            },
            parent_lsn: {
              description:
                'The Log Sequence Number (LSN) on the parent branch from which this branch was created\n',
              type: 'string',
              examples: ['0/1DE2850'],
            },
            parent_timestamp: {
              description:
                'The point in time on the parent branch from which this branch was created\n',
              type: 'string',
              format: 'date-time',
            },
            name: { description: 'The branch name\n', type: 'string', examples: ['dev2'] },
            current_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
              examples: ['ready'],
            },
            pending_state: {
              description: 'The branch state\n\n`init` `ready`',
              type: 'string',
              enum: ['init', 'ready'],
            },
            logical_size: {
              description: 'The logical size of the branch, in bytes\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            creation_source: {
              description: 'The branch creation source\n',
              type: 'string',
              examples: ['console'],
            },
            primary: {
              description: "Whether the branch is the project's primary branch\n",
              type: 'boolean',
              examples: [true],
            },
            cpu_used_sec: {
              description:
                'CPU seconds used by all the endpoints of the branch, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n',
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            created_at: {
              description: 'A timestamp indicating when the branch was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T19:09:48Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the branch was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-01T19:53:05Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['br-wispy-meadow-118737'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: { description: 'The branch ID', type: 'string' },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T19:09:48Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-01T19:53:05Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UpdateProjectBranchDatabase = {
  body: {
    type: 'object',
    required: ['database'],
    properties: {
      database: {
        type: 'object',
        properties: {
          name: { description: 'The name of the database\n', type: 'string', examples: ['mydb'] },
          owner_name: {
            description: 'The name of the role that owns the database\n',
            type: 'string',
            examples: ['sally'],
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          branch_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The branch ID',
          },
          database_name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The database name',
          },
        },
        required: ['project_id', 'branch_id', 'database_name'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['database', 'operations'],
      properties: {
        database: {
          type: 'object',
          required: ['id', 'branch_id', 'name', 'owner_name', 'created_at', 'updated_at'],
          properties: {
            id: {
              description: 'The database ID\n',
              type: 'integer',
              format: 'int64',
              examples: [834686],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            branch_id: {
              description: 'The ID of the branch to which the database belongs\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            name: { description: 'The database name\n', type: 'string', examples: ['neondb'] },
            owner_name: {
              description: 'The name of role that owns the database\n',
              type: 'string',
              examples: ['casey'],
            },
            created_at: {
              description: 'A timestamp indicating when the database was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the database was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-11-30T18:25:15Z'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: [834686],
              },
              project_id: { description: 'The Neon project ID', type: 'string' },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-11-30T18:25:15Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UpdateProjectEndpoint = {
  body: {
    type: 'object',
    required: ['endpoint'],
    properties: {
      endpoint: {
        type: 'object',
        properties: {
          branch_id: {
            description:
              'The destination branch ID. The destination branch must not have an exsiting read-write endpoint.\n',
            type: 'string',
            examples: ['br-tiny-grass-283160'],
          },
          autoscaling_limit_min_cu: {
            description: 'The minimum number of CPU units\n',
            type: 'number',
          },
          autoscaling_limit_max_cu: {
            description: 'The maximum number of CPU units\n',
            type: 'number',
          },
          provisioner: {
            type: 'string',
            description: 'The Neon compute provisioner.\n',
            enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
          },
          settings: {
            type: 'object',
            description: 'A collection of settings for a compute endpoint',
            properties: {
              pg_settings: {
                description: 'A raw representation of PostgreSQL settings',
                type: 'object',
                additionalProperties: { type: 'string' },
              },
            },
          },
          pooler_enabled: {
            description: 'Whether to enable connection pooling for the compute endpoint\n',
            type: 'boolean',
          },
          pooler_mode: {
            description:
              'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n',
            type: 'string',
            enum: ['transaction'],
          },
          disabled: {
            description: 'Whether to restrict connections to the compute endpoint\n',
            type: 'boolean',
          },
          passwordless_access: {
            description:
              'NOT YET IMPLEMENTED. Whether to permit passwordless access to the compute endpoint.\n',
            type: 'boolean',
          },
          suspend_timeout_seconds: {
            description:
              'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
            type: 'integer',
            format: 'int64',
            minimum: -1,
            maximum: 86400,
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The Neon project ID',
          },
          endpoint_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The endpoint ID',
          },
        },
        required: ['project_id', 'endpoint_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['endpoint', 'operations'],
      properties: {
        endpoint: {
          type: 'object',
          required: [
            'host',
            'id',
            'project_id',
            'branch_id',
            'region_id',
            'autoscaling_limit_max_cu',
            'autoscaling_limit_min_cu',
            'type',
            'current_state',
            'pooler_enabled',
            'pooler_mode',
            'disabled',
            'passwordless_access',
            'creation_source',
            'created_at',
            'updated_at',
            'settings',
            'proxy_host',
            'suspend_timeout_seconds',
            'provisioner',
          ],
          properties: {
            host: {
              description:
                'The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639.us-east-2.aws.neon.tech'],
            },
            id: {
              description:
                'The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n',
              type: 'string',
              examples: ['ep-silent-smoke-806639'],
            },
            project_id: {
              description: 'The ID of the project to which the compute endpoint belongs\n',
              type: 'string',
              examples: ['spring-example-302709'],
            },
            branch_id: {
              description: 'The ID of the branch that the compute endpoint is associated with\n',
              type: 'string',
              examples: ['br-wispy-meadow-118737'],
            },
            autoscaling_limit_min_cu: {
              description: 'The minimum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            autoscaling_limit_max_cu: {
              description: 'The maximum number of CPU units\n',
              type: 'number',
              examples: [1],
            },
            region_id: {
              type: 'string',
              description: 'The region identifier\n',
              examples: ['aws-us-east-2'],
            },
            type: {
              description:
                'The compute endpoint type. Either `read_write` or `read_only`.\nThe `read_only` compute endpoint type is not yet supported.\n\n\n`read_only` `read_write`',
              type: 'string',
              enum: ['read_only', 'read_write'],
              examples: ['read_write'],
            },
            current_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['init'],
            },
            pending_state: {
              description: 'The state of the compute endpoint\n\n\n`init` `active` `idle`',
              type: 'string',
              enum: ['init', 'active', 'idle'],
              examples: ['active'],
            },
            settings: {
              type: 'object',
              description: 'A collection of settings for a compute endpoint',
              properties: {
                pg_settings: {
                  description: 'A raw representation of PostgreSQL settings',
                  type: 'object',
                  additionalProperties: { type: 'string' },
                },
              },
            },
            pooler_enabled: {
              description: 'Whether connection pooling is enabled for the compute endpoint\n',
              type: 'boolean',
            },
            pooler_mode: {
              description:
                'The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`',
              type: 'string',
              enum: ['transaction'],
              examples: ['transaction'],
            },
            disabled: {
              description: 'Whether to restrict connections to the compute endpoint\n',
              type: 'boolean',
            },
            passwordless_access: {
              description: 'Whether to permit passwordless access to the compute endpoint\n',
              type: 'boolean',
              examples: [true],
            },
            last_active: {
              description: 'A timestamp indicating when the compute endpoint was last active\n',
              type: 'string',
              format: 'date-time',
            },
            creation_source: {
              description: 'The compute endpoint creation source\n',
              type: 'string',
              examples: ['console'],
            },
            created_at: {
              description: 'A timestamp indicating when the compute endpoint was created\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            updated_at: {
              description: 'A timestamp indicating when the compute endpoint was last updated\n',
              type: 'string',
              format: 'date-time',
              examples: ['2022-12-03T15:37:07Z'],
            },
            proxy_host: {
              description: 'DEPRECATED. Use the "host" property instead.\n',
              type: 'string',
              examples: ['us-east-2.aws.neon.tech'],
            },
            suspend_timeout_seconds: {
              description:
                'Duration of inactivity in seconds after which endpoint will be\nautomatically suspended. Value `0` means use global default,\n`-1` means never suspend. Maximum value is 24 hours in seconds.\n',
              type: 'integer',
              format: 'int64',
              minimum: -1,
              maximum: 86400,
            },
            provisioner: {
              type: 'string',
              description: 'The Neon compute provisioner.\n\n\n`k8s-pod` `k8s-neonvm` `docker`',
              enum: ['k8s-pod', 'k8s-neonvm', 'docker'],
            },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'project_id',
              'action',
              'status',
              'failures_count',
              'created_at',
              'updated_at',
            ],
            properties: {
              id: {
                description: 'The operation ID',
                type: 'string',
                format: 'uuid',
                examples: ['ep-silent-smoke-806639'],
              },
              project_id: {
                description: 'The Neon project ID',
                type: 'string',
                examples: ['spring-example-302709'],
              },
              branch_id: {
                description: 'The branch ID',
                type: 'string',
                examples: ['br-wispy-meadow-118737'],
              },
              endpoint_id: { description: 'The endpoint ID', type: 'string' },
              action: {
                description:
                  'The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_migrate` `tenant_detach` `tenant_reattach` `replace_safekeeper`',
                type: 'string',
                enum: [
                  'create_compute',
                  'create_timeline',
                  'start_compute',
                  'suspend_compute',
                  'apply_config',
                  'check_availability',
                  'delete_timeline',
                  'create_branch',
                  'tenant_migrate',
                  'tenant_detach',
                  'tenant_reattach',
                  'replace_safekeeper',
                ],
              },
              status: {
                description:
                  'The status of the operation\n\n`running` `finished` `failed` `scheduling`',
                type: 'string',
                enum: ['running', 'finished', 'failed', 'scheduling'],
              },
              error: { description: 'The error that occured', type: 'string' },
              failures_count: {
                description: 'The number of times the operation failed',
                type: 'integer',
                format: 'int32',
                minimum: -2147483648,
                maximum: 2147483647,
              },
              retry_at: {
                description: 'A timestamp indicating when the operation was last retried',
                type: 'string',
                format: 'date-time',
              },
              created_at: {
                description: 'A timestamp indicating when the operation was created',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
              updated_at: {
                description: 'A timestamp indicating when the operation status was last updated',
                type: 'string',
                format: 'date-time',
                examples: ['2022-12-03T15:37:07Z'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    default: {
      type: 'object',
      description: 'General Error',
      required: ['message', 'code'],
      properties: {
        code: { type: 'string' },
        message: { description: 'Error message', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
export {
  CreateApiKey,
  CreateProject,
  CreateProjectBranch,
  CreateProjectBranchDatabase,
  CreateProjectBranchRole,
  CreateProjectEndpoint,
  DeleteProject,
  DeleteProjectBranch,
  DeleteProjectBranchDatabase,
  DeleteProjectBranchRole,
  DeleteProjectEndpoint,
  GetProject,
  GetProjectBranch,
  GetProjectBranchDatabase,
  GetProjectBranchRole,
  GetProjectBranchRolePassword,
  GetProjectEndpoint,
  GetProjectOperation,
  ListApiKeys,
  ListProjectBranchDatabases,
  ListProjectBranchEndpoints,
  ListProjectBranchRoles,
  ListProjectBranches,
  ListProjectEndpoints,
  ListProjectOperations,
  ListProjects,
  ListProjectsConsumption,
  ResetProjectBranchRolePassword,
  RevokeApiKey,
  SetPrimaryProjectBranch,
  StartProjectEndpoint,
  SuspendProjectEndpoint,
  UpdateProject,
  UpdateProjectBranch,
  UpdateProjectBranchDatabase,
  UpdateProjectEndpoint,
};
