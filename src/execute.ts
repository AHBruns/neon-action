import * as core from '@actions/core'
import {z} from 'zod'
import jp from 'jsonpath'

import api from 'api'

export async function execute() {
  const inputs = get_inputs()

  const neon = api(
    'https://dfv3qgd2ykmrx.cloudfront.net/api_spec/release/v2.json'
  ).auth(inputs.api_key)

  let response: any
  switch (inputs.method) {
    case 'createProjectBranch': {
      response = await neon.createProjectBranch(inputs.body, inputs.metadata)
      break
    }
    default: {
      throw new Error(`Unknown method: ${inputs.method}`)
    }
  }

  if (response.status == 201 && !('code' in response.data)) {
    core.setOutput('data', response.data)
    core.setOutput('selection', jp.value(response.data, inputs.selector))
    core.setOutput('selections', jp.query(response.data, inputs.selector))
  } else {
    throw new Error(`${response.data.code}:${response.data.message}`)
  }
}

function get_inputs() {
  return {
    method: z.string().nonempty().parse(core.getInput('method')),
    api_key: z.string().nonempty().parse(core.getInput('api_key')),
    body: JSON.parse(core.getInput('body') || '{}'),
    metadata: JSON.parse(core.getInput('metadata') || '{}'),
    selector: core.getInput('selector') || '$'
  }
}
