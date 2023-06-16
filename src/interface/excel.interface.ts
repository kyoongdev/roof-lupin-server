interface StatisticExcel {
  header: string;
  data: Array<string>;
  extra?: {
    title: string;
    headers: Array<string>;
    extraData: Array<string>;
  };
}
