import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PackinglistService } from '../../services/packinglist.service';
import { Packinglist } from '../../models/PackingList';
import { Packing } from '../../models/Packing';

@Component({
  selector: 'app-packinglist-part',
  templateUrl: './packinglist-part.component.html',
  styleUrls: ['./packinglist-part.component.scss']
})
export class PackinglistPartComponent {
  typesOfItems: string[] = ['Boarding pass', 'Wallet', 'Drivers License','Cellphone','Laptop/Tablet', 'Optional: Passport', "Electronic Chargers", 'Outlet Adapter'];
  @Input() tripid: Number;
  @Input() tripname:String;
  allLists!:Packinglist[];
  list:Packing[];
  showPacking= false;

  constructor(private packingService:PackinglistService){}

  ngOnInit(){
    this.fetchList();
  }

  createPosting(item:String,checked:Boolean):Packing{
    var posting:Packing = {item,checked}
    return posting;
  }

  fetchList(){
    this.list = new Array(10);
    this.packingService.fetchAll().subscribe(posts =>{
      for(const post of posts){
        if(post.tripid == this.tripid){
           
            this.list[0]=(this.createPosting(post.item1,post.checked1))
            this.list[1]=(this.createPosting(post.item2,post.checked2))
            this.list[2]=(this.createPosting(post.item3,post.checked3))
            this.list[3]=(this.createPosting(post.item4,post.checked4))
            this.list[4]=(this.createPosting(post.item5,post.checked5))
            this.list[5]=(this.createPosting(post.item6,post.checked6))
            this.list[6]=(this.createPosting(post.item7,post.checked7))
            this.list[7]=(this.createPosting(post.item8,post.checked8))
            this.list[8]=(this.createPosting(post.item9,post.checked9))
            this.list[9]=(this.createPosting(post.item10,post.checked10))
        }
      }

    })
  }


  submit(aList:Packing[]){

    // console.log(aList[0].checked);
    // console.log(aList[1].checked);
    // console.log(aList[2].checked);
    // console.log(aList[3].checked);
    // console.log(aList[4].checked);
    // console.log(aList[5].checked);
    // console.log(aList[6].checked);
    // console.log(aList[7].checked);
    // console.log(aList[8].checked);
    // console.log(aList[9].checked);
    this.packingService.editPackingList(aList,this.tripid).subscribe(post =>{
    })


  }



}
