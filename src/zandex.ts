import { format } from '@fast-csv/format';
import * as csv from 'fast-csv';

import * as path from 'path';
import * as fs from 'fs';
import { FormatterOptionsArgs, Row, writeToStream } from '@fast-csv/format';

const directoryPath = path.join(__dirname, '../data')

const outFilePath = path.join(directoryPath, 'out.csv')
const outFileStream = fs.createWriteStream(outFilePath)



type CsvFileOpts = {
  headers: string[];
  path: string;
};






export const zandex = async (): Promise<boolean> => {

  var dataFiles = [ path.join(directoryPath, '2022-05-02/101523357 Details.csv') ]

  const finalHeaders = [
    'col1_empty2',
    'Date',
    'Description',
    'Category',
    'Amount',
    'Account',
    'Account #',
    'Institution'
  ]



  // gather CSVs
  // read CSVs
  // transform CSV
  // write CSV



  dataFiles.forEach((inputFilePath) => {
    transformFile(inputFilePath)
  })


  // const csvOutFile = new CsvFile({
  //   path: outFilePath,
  //   // headers to write
  //   headers: finalHeaders,
  // });



  // csvFile
  //   .create(outRows)
  //   .then(() => {
  //     // append if we wanted
  //   })
  //   .then(() => {
  //     console.log('wrote')
  //   )
  //   .catch(err => console.log(err))





  function transformFile(inputFilePath) {
    console.log('transformFile', inputFilePath)

    var outRows: object[] = [];



    const csvOutputStream = format({ // headers: true
      headers: finalHeaders,
      quoteColumns: true
    })

    csvOutputStream
      .pipe(outFileStream)
      .on('end', () => {
        console.log(outRows)
        console.log('END OUTPUT csvOutputStream')
        process.exit()
      });


    fs.createReadStream(inputFilePath)
      .pipe(
        csv.parse({
          headers: true
        })
      )
      .on('error', error => console.error(error))
      .on('data', row => {
        // console.log(row)
        // Tiller Headers
        var newRow = transformRow(row)

        // stream.write(newRow)
        console.log(newRow)
        console.log('END data')

        outRows.push(newRow)

        csvOutputStream.write(newRow)
      })
      .on('end', (rowCount: number) => {
        console.log(`END read CSV; Parsed ${rowCount} rows;`)
        console.log('outRows', outRows.length)
        console.log('outRows', outRows)
        // console.log(`Parsed ${rowCount} rows`)
        // console.log(outRows);



        // csvOutputStream.writeToST(outRows)

        // writeToStream(csvOutputStream, outRows)
        //   .on('error', (err: Error) => console.log('err', err))
        //   .on('finish', () => console.log('finished writing rows ', outRows.length));

        csvOutputStream.end()
      })
  } // end function

  function transformRow(row) {
    var transformedRow = {
      "col1_empty": "",
      "Date": row.Date,
      "Description": row.Description,
      "Category": "",
      "Amount": row.Transfer,
      "Account": "home-eqb",
      "Account_#": "101523357",
      "Institution": "eqbank-ca"
    }

    return transformedRow
  }



  return true




}

