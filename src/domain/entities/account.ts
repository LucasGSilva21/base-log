export type AccountProps = {
  name: string
  email: string
  password: string
  isActive: boolean
}

export type AccountEntity = {
  accountId: string
  createdAt: Date
  updatedAt: Date
} & AccountProps
