type AutomationTriggerDTO = {
  id?: string
  automationId: string
  automationTriggerTypeId: number
  mediaId?: string
  isAll?: boolean
  title: string
  keyword?: string
  isExact?: boolean
  autoLike?: boolean
  isNoReply?: boolean
  replies?: string
  isActive?: boolean
  runCount?: number
  ctrCount?: number
}