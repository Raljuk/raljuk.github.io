export interface Day {
  array: [];
  // eslint-disable-next-line camelcase
  contact_date: string;
}

export interface Data {
  week: [],
  deltaY: number,
  date: Date,
  inProcess: boolean,
  orbiter: (number | undefined)[],
}
