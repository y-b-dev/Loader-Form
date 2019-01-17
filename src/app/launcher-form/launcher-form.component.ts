import { Component, OnInit, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { BalanceService } from '../balance.service';
import { BalanceModel } from '../interfaces/balance-model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-launcher-form',
  templateUrl: './launcher-form.component.html',
  styleUrls: ['./launcher-form.component.css']
})
export class LauncherFormComponent implements OnInit, OnDestroy {
  private $formSub: Subscription;
  @ViewChild('f') form: NgForm;

  sliderVal: number;
  maxVal: number; // Initial Main Balance
  currency: string;
  mainBalance: number;
  gameBalance: number;
  isNoFunds: boolean;
  isNoGameBalance: boolean;

  constructor(private balService: BalanceService) { }

  ngOnInit() {
    const data: BalanceModel = this.balService.getData();
    const { gameBalance, mainBalance } = data;
    this.currency = data.currency;
    this.mainBalance = mainBalance;
    this.gameBalance = gameBalance;
    this.maxVal = mainBalance;

    this.$formSub = this.form.valueChanges.subscribe(vals => {
      const gameBalance = isNaN(+vals.gameBalance) ? 0 : +vals.gameBalance;
      const mainBalance = isNaN(+vals.mainBalance) ? 0 : +vals.mainBalance;
      console.log(gameBalance, mainBalance)
      const isNoGameBalance = !Boolean(gameBalance);
      this.isNoGameBalance = isNoGameBalance;
      this.isNoFunds = isNoGameBalance && !Boolean(mainBalance);
      this.maxVal = mainBalance - gameBalance;
      console.log(vals)
    });
  }

  onSliderChange(e) {
    console.log(e)
    const val = e.value - e.previousValue;
    this.gameBalance += val;
    this.mainBalance -= val;
  }

  genRandMainBal() {
    const mainBal = Math.floor((Math.random() * 100) + 100);
    this.mainBalance = mainBal;
    this.maxVal = mainBal - this.gameBalance;
    this.sliderVal = 0;
    return false;
  }

  genRandGameBal() {
    const gameBal = Math.floor((Math.random() * 100));
    this.gameBalance = gameBal;
    this.maxVal = this.mainBalance - gameBal;
    this.sliderVal = 0;
    return false;
  }

  gameLaunch() {

  }

  gameDeposit() {

  }

  gameTransferFunds() {

  }

  ngOnDestroy() {
    this.$formSub.unsubscribe();
  }

}
