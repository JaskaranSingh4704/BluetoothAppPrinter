import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
export default class App extends Component {
  state = {
    isBluetoothEnabled: false,
  };

  printDesign = async () => {
    alert('Success Print');

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.setBlob(0);
    await BluetoothEscposPrinter.printText('welcome\n\r', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.setBlob(0);
    await BluetoothEscposPrinter.printText('Print Recipt\n\r', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT,
    );
    await BluetoothEscposPrinter.printText('Price：30\n\r', {});
    await BluetoothEscposPrinter.printText(
      'Produvt：xsd201909210000001\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(
      '--------------------------------\n\r',
      {},
    );
    let columnWidths = [12, 6, 6, 8];
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['Item1', 'Item 2', 'Item 3', 'Item 4'],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['sandeep Singh', '1', '32000', '32000'],
      {},
    );
    await BluetoothEscposPrinter.printText('\n\r', {});
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['Jaskransingh', '1', '3200', '3200'],
      {},
    );
    await BluetoothEscposPrinter.printText('\n\r', {});
    await BluetoothEscposPrinter.printText(
      '--------------------------------\n\r',
      {},
    );
  };

  printReceipt = () => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        BluetoothManager.enableBluetooth().then(
          (r) => {
            this.setState({
              isBluetoothEnabled: true,
            });

            var paired = [];
            if (r && r.length > 0) {
              for (var i = 0; i < r.length; i++) {
                try {
                  paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
                } catch (e) {
                  alert(e);
                  //ignore
                }
              }
            }
            var jsonPairedData = JSON.stringify(paired);
            console.log(jsonPairedData);
            console.log('Success Find' + paired[0].address);

            /////////////////////////////

            BluetoothManager.connect(paired[0].address) // the device address scanned.
              .then(
                this.printDesign,

                (err) => {
                  alert(err);
                },
                (e) => {
                  alert(e);
                },
              );

            /////////////////////////////
          },
          (err) => {
            alert(err);
          },
        );
      },
      (err) => {
        alert(err);
      },
    );
  };

  render() {
    return (
      <View style={styles.bodyContainer}>
        <Text style={{fontSize: 30}}> Print Receipt </Text>

        <View>
          {/* <Text style={{fontSize: 20, color: 'dodgerblue', fontWeight: '700'}}>
            Bluetooth : {this.state.isBluetoothEnabled ? 'On' : 'Off'}
          </Text> */}
          <Text style={{fontSize: 20, color: 'red', fontWeight: '700'}}>
            Please Paired Your Device First
          </Text>
        </View>

        <View>
          <Text>Status</Text>
        </View>

        <View>
          <Button title="print  test  Receipt" onPress={this.printReceipt} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 0.7,
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
});
