import { Component, OnInit, ViewChild } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { PaymentsenseCodingChallengeApiService } from '../services';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

interface countries {
  name?: string,
  flag : string,
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  elementData: countries[];
  displayedColumns: string[] = ['name', 'flag'];//
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  countryList: any
  clickedCountry: any
  currencies: any; languages: any
  capital: string; population: string; borders: string; timezone: string;
  isShown: boolean = false
  constructor(private PaymentsenseCodingChallengeApiService: PaymentsenseCodingChallengeApiService) {
    this.dataSource = new MatTableDataSource<countries>(this.elementData);
  }

  

  ngOnInit() {
    this.getData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
    
  }
  getData(){
    this.PaymentsenseCodingChallengeApiService.getCountries().subscribe(
      data => {
        //this.countryList = data;
        this.countryList = data, this.dataSource.data = data as countries[]
      }
    );
    
  }

  getMoreInfo(name) {
    this.clickedCountry = this.countryList.filter(x => x.name === name);
    this.currencies = this.clickedCountry[0]["currencies"];
    this.languages = this.clickedCountry[0]["languages"];
    this.capital = this.clickedCountry[0]["capital"];
    this.population = this.clickedCountry[0]["population"];
    this.timezone = this.clickedCountry[0]["timezones"];
    this.borders = this.clickedCountry[0]["borders"];
    this.isShown = true;
    }

}
