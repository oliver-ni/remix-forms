import { inputFromForm } from 'domain-functions'
import type { SomeZodObject, z } from 'zod'
import { coerceValue } from './coercions'
import type { FormValues } from './formAction.server'

async function getFormValues<Schema extends SomeZodObject>(
  request: Request,
  schema: Schema,
): Promise<FormValues<z.infer<Schema>>> {
  const input = await inputFromForm(request)

  let values: FormValues<z.infer<Schema>> = {}
  for (const key in schema.shape) {
    const value = input[key]
    const shape = schema.shape[key]
    values[key as keyof z.infer<Schema>] = coerceValue(value, shape)
  }

  return values
}

export { getFormValues }
