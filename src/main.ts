import * as core from '@actions/core'
import {execute} from './execute'

async function run(): Promise<void> {
  try {
    await execute()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
