import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:  Hero[];

  hero : Hero = {
    id : 1,
    name : 'Windstorm'
  };

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
      console.log('heroes: ' + this.heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return; }

    this.heroService.addHero( {name} as Hero)
      .subscribe(hero => {this.heroes.push(hero)});
  }

  private findHeroIndex(hero: Hero) {
    var idx = -1;
    for (let index = 0; index < this.heroes.length; index++) {
      const element = this.heroes[index];
      if (element.id==hero.id) {
        return index;
      }
    }
    return idx;
  }

  delete(hero: Hero): void {
    console.log('hero : ' + hero);
    this.heroService.deleteHero(hero).subscribe(
      hero => { var idx = this.findHeroIndex(hero);//this.heroes.indexOf(hero); 
                console.log('hero : ' + hero.id+'-'+hero.name);
                console.log('idx : ' + idx);
                this.heroes.splice(idx,1); 
              },
      //error(error) { console.log('Error callback called : '+error.message) }
        
      );
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

}
