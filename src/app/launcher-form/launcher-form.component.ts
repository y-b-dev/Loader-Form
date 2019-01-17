import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BalanceService } from '../balance.service';
import { BalanceModel } from '../interfaces/balance-model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-launcher-form',
  templateUrl: './launcher-form.component.html',
  styleUrls: ['./launcher-form.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LauncherFormComponent implements OnInit, OnDestroy {
  private $formSub: Subscription;
  private $fetchDataSub: Subscription;

  @ViewChild('f') form: NgForm;
  data: BalanceModel;
  isDesktop: boolean;
  sliderVal: number;
  maxVal: number; // Initial Main Balance
  currency: string;
  mainBalance: number;
  gameBalance: number;
  isNoFunds: boolean;
  isNoGameBalance: boolean;

  constructor(private balService: BalanceService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isDesktop = true;
        } else {
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
    const { value } = e;
    this.sliderVal = value;
    this.data = { gameBalance: value, mainBalance: this.maxVal - value }
  }

  genRandBal() {
    const maxVal = this.maxVal;
    const mainBalance = Math.floor((Math.random() * maxVal));
    const gameBalance = maxVal - mainBalance;
    const isNoGameBalance = !Boolean(gameBalance);
    this.isNoGameBalance = isNoGameBalance;
    this.isNoFunds = isNoGameBalance && !Boolean(mainBalance);
    this.sliderVal = gameBalance;
    this.data = { mainBalance, gameBalance };
    return false;
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

  ngOnDestroy() {
    this.$formSub.unsubscribe();
    this.$fetchDataSub.unsubscribe();
  }

}





// import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
// import { BalanceService } from '../balance.service';
// import { BalanceModel } from '../interfaces/balance-model';
// import { NgForm } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// @Component({
//   selector: 'app-launcher-form',
//   templateUrl: './launcher-form.component.html',
//   styleUrls: ['./launcher-form.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class LauncherFormComponent implements OnInit, OnDestroy {
//   private $formSub: Subscription;
//   private $fetchDataSub: Subscription;

//   @ViewChild('f') form: NgForm;
//   isDesktop: boolean;
//   sliderVal: number;
//   maxVal: number; // Initial Main Balance
//   currency: string;
//   mainBalance: number;
//   gameBalance: number;
//   isNoFunds: boolean;
//   isNoGameBalance: boolean;

//   constructor(private balService: BalanceService, private breakpointObserver: BreakpointObserver) { }

//   ngOnInit() {
//     this.breakpointObserver
//       .observe(['(min-width: 500px)'])
//       .subscribe((state: BreakpointState) => {
//         if (state.matches) {
//           this.isDesktop = true;
//         } else {
//           this.isDesktop = false;
//         }
//       });

//     const data: BalanceModel = this.balService.getData();
//     const { gameBalance, mainBalance, currency } = data;
//     this.currency = currency;
//     this.mainBalance = mainBalance;
//     this.gameBalance = gameBalance;
//     this.maxVal = mainBalance + gameBalance;

//     this.$formSub = this.form.valueChanges.subscribe(vals => {
//       console.log("new values", vals)
//       console.log("old values", this.mainBalance, this.gameBalance)
//       const maxVal = this.maxVal;
//       console.log("max value", maxVal)
//       let gameBalance = Number(vals.gameBalance);
//       let mainBalance = Number(vals.mainBalance);
//       if (gameBalance > maxVal) {
//         gameBalance = maxVal - mainBalance;
//       }
//       else if (mainBalance > maxVal) {
//         this.mainBalance = mainBalance = maxVal - gameBalance;
//       }
//       else if (gameBalance === this.gameBalance) {
//         this.gameBalance = gameBalance = maxVal - mainBalance;
//         this.mainBalance = mainBalance;
//       }
//       else {
//         this.mainBalance = mainBalance = maxVal - gameBalance;
//         this.gameBalance = gameBalance;
//       }
//       const isNoGameBalance = !Boolean(gameBalance);
//       this.isNoGameBalance = isNoGameBalance;
//       this.isNoFunds = isNoGameBalance && !Boolean(mainBalance);
//       this.gameBalance = this.sliderVal = gameBalance;
//     });
//   }

//   onSliderChange(e) {
//     const { value, previousValue } = e;
//     if (value > previousValue) {
//       const diff = value - previousValue;
//       this.gameBalance += diff;
//       this.mainBalance -= diff;
//     }
//     else {
//       const diff = previousValue - value;
//       this.gameBalance -= diff;
//       this.mainBalance += diff;
//     }
//   }

//   genRandBal() {
//     const maxVal = this.maxVal;
//     const mainBal = Math.floor((Math.random() * maxVal));
//     this.mainBalance = mainBal;
//     this.gameBalance = maxVal - mainBal;
//     return false;
//   }

//   gameLaunch() {
//     return false;
//   }

//   gameDeposit() {
//     return false;
//   }

//   gameTransferFunds() {
//     return false;
//   }

//   ngOnDestroy() {
//     this.$formSub.unsubscribe();
//     this.$fetchDataSub.unsubscribe();
//   }

// }
