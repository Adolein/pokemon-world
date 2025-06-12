import { Component } from '@angular/core';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'lib-pokemon-world-lib',
  imports: [TestComponent],
  templateUrl: './pokemon-world-lib.component.html',
  styleUrl: './pokemon-world-lib.component.scss',
})
export class PokemonWorldLibComponent {}
