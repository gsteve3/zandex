import { format } from '@fast-csv/format';

export const zandex = async (): Promise<boolean> => {


  // https://c2fo.github.io/fast-csv/docs/formatting/examples
  const stream = format({ delimiter: '\t' });
  stream.pipe(process.stdout);

  stream.write(['a', 'b']);
  stream.write(['a1', 'b1']);
  stream.write(['a2', 'b2']);
  stream.end();
  // end fast-csv example

  return true;
}
