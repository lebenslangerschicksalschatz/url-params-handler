export interface paramsOutputData {
  [key: string]: string | string[]
}

export interface paramsInputData {
  [key: string]: string | null
}

export interface updateParams {
  key: string,
  value: string | number,
  action: 'replace' | 'add' | 'preserve',
}

export const parseParamValue = (value: string): string | string[] => {
  const isArray = value.includes(',')

  if (!isArray) return value

  return value.split(',').filter(i => i.length > 0 && i)
}
