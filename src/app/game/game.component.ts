import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../service/game.service';
import { UserService } from '../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  price: string;
  gameName: string;
  video: string;
  game: Game;
  imgageURL: string;
  searchID: string;
  username: string="user";

  loggeduser: string;


  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private userService: UserService) { 
    this.loggeduser = localStorage.userName == ""? "log in to comment" : localStorage.userName;

  }



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      this.searchID = params['game'];
      console.log(params['game']);
    })

    this.gameService.getGame(this.searchID)
    .subscribe( (data: Game) => {
      this.game = {
        searchID: data['searchID'],
        gameName: data['gameName'],
        description: data['description'],
        gamePrice: data['gamePrice'],
        company: data['company'],
        pictuer1: data['pictuer1'],
        picture2: data['picture2'],
        url: data['url']
      };
      console.log(this.game);
      this.gameName = this.game.gameName;
      this.price = String(this.game.gamePrice);
      this.video = this.game.url;
      this.imgageURL = this.game.picture2;
      console.log(this.video);

      let html = `<embed src="${this.video}"  height="500" width="850"/>`;
      document.getElementById('gameVideo').innerHTML = html;
      console.log(html);
    })

  }

  buyGame() {

    if(localStorage.userName == "" ) {
      alert("please log in to buy this game.");
      return ;
    }
    let product = {
      productName: this.game.searchID
    };
    this.userService.addProduct(this.loggeduser, product)
    .subscribe(
      data => {
        alert("successfully");
      }
    )

    
  }

}
