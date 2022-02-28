export type SelectItem = {
  id: string;
  name: string;
  workType?: string;
  // Ошибка проектирования. Надо было сущность отправлять
  // TODO: исправить
  data?: any;
  uid: string;
};
