import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { BalanceService } from './balance.service';
import { BalanceModel } from './interfaces/balance-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loader-SPA';

  private $formSub: Subscription;
  private $fetchDataSub: Subscription;

  @ViewChild('f')
  form: NgForm;
  data: BalanceModel;
  currency: string;
  sliderVal: number;
  maxVal: number; // Initial Main Balance
  isDesktop: boolean;
  isNoFunds: boolean;
  isNoGameBalance: boolean;

  constructor(private balService: BalanceService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 550px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isDesktop = true;
        }
        else {
          this.isDesktop = false;
        }
      });

    const data: BalanceModel = this.balService.getData();
    this.data = data;
    const { gameBalance, mainBalance } = data;
    this.currency = data.currency;
    this.maxVal = mainBalance + gameBalance;
    this.$formSub = this.form.valueChanges.subscribe(vals => {
      const maxVal = this.maxVal;
      let gameBalance = +vals.gameBalance;
      let mainBalance = +vals.mainBalance;
      const sum = gameBalance + mainBalance;
      if (sum > maxVal) {
        if (mainBalance === this.data.mainBalance) {
          mainBalance = maxVal - gameBalance;
        }
        else {
          gameBalance = maxVal - mainBalance;
        }
      }
      else if (mainBalance === this.data.mainBalance) {
        mainBalance = maxVal - gameBalance;
      }
      else if (gameBalance === this.data.gameBalance) {
        gameBalance = maxVal - mainBalance;
      }
      const isNoGameBalance = !Boolean(gameBalance);
      this.isNoGameBalance = isNoGameBalance;
      this.isNoFunds = isNoGameBalance && !Boolean(mainBalance);
      this.sliderVal = gameBalance;
      this.data = { mainBalance, gameBalance };
    });
  }
  onSliderChange(e) {
    console.log(e);
    const { value } = e;
    this.data = { gameBalance: value, mainBalance: this.maxVal - value };
  }
  genRandBal() {
    const maxVal = this.maxVal;
    const mainBalance = Math.floor((Math.random() * maxVal));
    const gameBalance = maxVal - mainBalance;
    const isNoGameBalance = !Boolean(gameBalance);
    this.isNoGameBalance = isNoGameBalance;
    this.isNoFunds = isNoGameBalance && !Boolean(mainBalance);
    this.data = { mainBalance, gameBalance };
    return false;
  }
  isDisableLeftSliderBtn() {
    return this.data.gameBalance === 0 || this.isNoFunds
  }
  isDisableRightSliderBtn() {
    return this.data.gameBalance === this.maxVal || this.isNoFunds
  }
  gameLaunch() {
    return false;
  }
  gameDeposit() {
    return false;
  }
  gameTransferFunds() {
    return false;
  }
  moveAllToMainBalance() {
    this.data = {
      mainBalance: this.maxVal,
      gameBalance: 0
    };
    return false;
  }
  moveAllToGameBalance() {
    this.data = {
      mainBalance: 0,
      gameBalance: this.maxVal
    };
    return false;
  }
  ngOnDestroy() {
    this.$formSub.unsubscribe();
    this.$fetchDataSub.unsubscribe();
  }
}
