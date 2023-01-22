export interface NotifyService {
  sendEmailToAdmin(message: string): Promise<void>
}
