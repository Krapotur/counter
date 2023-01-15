import {Component, OnInit, Output} from '@angular/core';
import {Counter} from "../interfaces.interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent implements OnInit {
  success = false;
  textXml = ''; //31119 - 114
  inputXML = '';
  allCounters: Counter [] = [];
  arrCounters: any = [];
  nameOrganization: any;
  day: any;
  data = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  createTable() {
    this.findElements();
    this.success = true
  }

  findElements() {
    let id: number = 1;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.textXml, "text/xml");
    const findCounters = xmlDoc.getElementsByTagName('measuringpoint');
    const findValues = xmlDoc.getElementsByTagName("measuringchannel");

    console.log(this.inputXML)
    this.nameOrganization = xmlDoc.getElementsByTagName("name")[1].textContent;
    this.day = xmlDoc.getElementsByTagName("day")[0].textContent;
    this.data = this.day.substring(6, 8) + '.' + this.day.substring(4, 6) + '.' + this.day.substring(0, 4);

    for (let i = 0; i < findCounters.length; i++) {
      let sumValuesArr: number [] = [];
      const arrValue_1: number [] = [];
      const arrValue_2: number [] = [];
      const arrValue_3: number [] = [];
      const counterNum = findValues[i].children;

      this.arrCounters.push(findCounters[i].getAttribute('name'))

      for (let j = 0; j < findValues[0].children.length; j++) {
        const parseValue = parseFloat((counterNum[j].childNodes[1].textContent as string)
          .replace(',','.'));
        const value = Math.round(parseValue * 100)/100
        if (arrValue_1.length < 20) {
          arrValue_1.push(value)
        } else if (arrValue_2.length < 20) {
          arrValue_2.push(value)
        } else {
          arrValue_3.push(value)
        }
      }

      sumValuesArr = [...arrValue_1, ...arrValue_2, ...arrValue_3];

      const counter: Counter = {
        id: id,
        name: this.arrCounters[i],
        valuesPart_1: arrValue_1,
        valuesPart_2: arrValue_2,
        valuesPart_3: arrValue_3
      }

      id++
      this.sumValuesCounters(sumValuesArr, counter)
    }
  }

  sumValuesCounters(arr: number[], counter: Counter) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i]
    }
    counter.sumValues = Math.round(sum * 100) / 100
    this.allCounters.push(counter)
  }

  readFile(event: Event) {
    let result = '';
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();

    reader.onload =  () => {
      result = (reader.result as string).slice(45, 31119)
      this.temp(result)
    }
    //console.log(result)
    reader.readAsText(file);
  }

  temp(result: any){
      this.inputXML = result
  }
}

