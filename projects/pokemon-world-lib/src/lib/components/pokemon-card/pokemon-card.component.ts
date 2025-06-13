import { JsonPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-pokemon-card',
  imports: [MatCardModule, RouterModule, JsonPipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon: any;

  private router = inject(Router);

  gotoHome() {}

  onCardClick() {
    console.log('Card clicked:', this.pokemon);
    console.log(
      'Navigating to:',
      '/' + this.pokemon.name + '/' + this.pokemon.id
    );
    this.router.navigate(['/pokemon', this.pokemon.name, this.pokemon.id]);
  }
}
