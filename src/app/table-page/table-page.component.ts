import {Component, Input, OnInit} from '@angular/core';
import {Counter} from "../interfaces.interface";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  @Input() allCounter?: Counter[];
  @Input() nameOrganization: any;
  @Input() data = '';

  startTimeArr_part1: string [] = []
  startTimeArr_part2: string [] = []
  startTimeArr_part3: string [] = []

  endTimeArr_part1: string [] = []
  endTimeArr_part2: string [] = []
  endTimeArr_part3: string [] = []

  timeArr_part1: string [] = []
  timeArr_part2: string [] = []
  timeArr_part3: string [] = []

constructor() { }

  ngOnInit(): void {
    this.createTimeFor30min()
  }

  createTimeFor30min(){
    this.createStartTime()
    this.creatEndTime()
  }

  createStartTime(){
    const hHTimeArr: string []= []
    const mMTimeArr: string []= []
    for (let i = 0; i < 49; i++) {
      let hH = '0';
      hH += i;
      if (hH.toString().length > 2){
        const time = hH.toString().substring(1,3)
        hHTimeArr.push(time)
        hHTimeArr.push(time)
      } else {
        hHTimeArr.push(hH)
        hHTimeArr.push(hH)
      }

      if( !(i % 2)){
        mMTimeArr.push('00')
      } else {
        mMTimeArr.push('30')
      }

      const start = hHTimeArr[i] + ':' + mMTimeArr[i]

      if(this.startTimeArr_part1.length < 20){
        this.startTimeArr_part1.push(start)
      } else if(this.startTimeArr_part2.length < 20){
        this.startTimeArr_part2.push(start)
      } else {
        this.startTimeArr_part3.push(start)
      }
    }
  }

  creatEndTime(){
    const HHTimeArr: string []= []
    const MMTimeArr: string []= []

    for (let i = 0; i < 49; i++) {
      let hH = '0';
      hH += i;
      if (hH.toString().length > 2){
        const time = hH.toString().substring(1,3)
        HHTimeArr.push(time)
        HHTimeArr.push(time)
      } else {
        HHTimeArr.push(hH)
        HHTimeArr.push(hH)
      }

      if( !(i % 2)){
        MMTimeArr.push('00')
      } else {
        MMTimeArr.push('30')
      }

      const end = HHTimeArr[i] + ':' + MMTimeArr[i]

      if(this.endTimeArr_part1.length < 21){
        this.endTimeArr_part1.push(end)
      } else if(this.endTimeArr_part2.length < 20){
        this.endTimeArr_part2.push(end)
      } else {
        this.endTimeArr_part3.push(end)
      }
    }
    this.endTimeArr_part1.shift()

    for (let i = 0; i < 20; i++) {
      const time_1 = this.startTimeArr_part1[i] + ' - ' + this.endTimeArr_part1[i]
      const time_2 = this.startTimeArr_part2[i] + ' - ' + this.endTimeArr_part2[i]

      this.timeArr_part1.push(time_1)
      this.timeArr_part2.push(time_2)
    }

    for (let j = 0; j < this.startTimeArr_part3.length - 1; j++) {
      const time_3 = this.startTimeArr_part3[j] + ' - ' + this.endTimeArr_part3[j]
      this.timeArr_part3.push(time_3)
    }
  }
}
