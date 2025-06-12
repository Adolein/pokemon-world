# Platform

Dieses Projekt soll dazu dienen die Grundlagen von Angular anhand von Beispielen näher zu beleuchten.

In dem Ordner **"projects"** sind in den jeweiligen Projekten README.md-Dateien enthalten, die das entsprechende Modul näher beschreiben.
Es wird empfohlen sich diese aufmerksam durchzulesen und dann die entsprechenden Aufgaben in den Aufgaben.md-Dateien zu bearbeiten.

# Projekt starten

Terminal öffnen und in das Platform-Verzeichnis wechseln (.../AngularPlayground/platform).

Zuerst mit

```
pnpm i
```

das Projekt initialisieren.

Zum Starten einfach den Befehl

```
pnpm start
```

oder

```
ng serve
```

im Terminal ausführen.

Die Anwendung wird standardmäßig auf dem Port http://localhost:4200 gestartet

# Neue Library hinzufügen

In diesem Projekt werden neue fachlich getrennte Themen in einer eigenen Library gesammelt.

Folgende Schritte sind erforderlich mm diese Libraries zu erstellen:

### 1. Angular CLI

Öffne das Terminal und führe folgenden Befehl im Root Verzeichnis des Projekts aus:

```
ng generate library ${LIBRARY-NAME} <-- füge hier den Namen deiner Library ein
```

Deine neu angelegte Library befindet sich nun im Root Projekt in dem Ordner "projects".

### 2. Konfiguration in der angular.json

Öffne nun die angular.json und Suche in dem JSON dort nach dem Namen deiner neu angelegten Library.

Ergänze die JSON deiner Library um folgende Zeilen:

```json
"schematics": {
    "@schematics/angular:component": {
      "style": "scss",
      "skipTests": true
    },
    "@schematics/angular:class": {
      "skipTests": true
    },
    "@schematics/angular:directive": {
      "skipTests": true
    },
    "@schematics/angular:pipe": {
      "skipTests": true
    },
    "@schematics/angular:service": {
      "skipTests": true
    }
  },
```

Diese Konfiguration verhindert, dass Testdateien mit der Endung .spec.ts angelegt werden, da wir diese für dieses Beispielprojekt nicht benötigen.

Des Weiteren werden beim Anlegen von Komponenten standardmäßig SCSS und keine CSS Dateien erstellt, da dies der Standard für dieses Projekt ist.

### 3. Anpassung des Pfades der neuen Library in der tsconfig.json

Öffne die tsconfig.json, die sich ebenfalls im Root Verzeichnis des Projektes befindet.

Passe in der JSON im Abschnitt "path" den Pfad zu deiner Library wie folgt an:

```json
"paths": {
    "@${LIBRARY NAME}$Lib": ["projects/${LIBRARY NAME}/"],
  },
```

Bitte beachte beim Namen den "Lib"-Suffix, um die Namenskonvention für dieses Projekt einzuhalten.

### 4. Letzte Anpassungen in der neuen Library

Navigiere in die neu angelegte Library und erstelle auf der Root-Ebene eine index.ts mit folgendem Inhalt:

```typescript
export * from "./src/public-api";
```

Im "src" Ordner wurde die Datei public-api.ts erstellt in der die Komponenten, Services, einzelne TS-Dateien etc. nach "außen" zum Import bereitsgestellt werden. Wenn man also in einer anderen Library etwas aus dieser Library importieren möchte, muss es zwangsläufig in dieser Datei referenziert werden.

Es wird empfohlen unter dem Ordner /src/lib/ mindestens die 3 Ordner "components", "models" und "services" anzulegen.

Öffne den Ordner "components" im Terminal und führe dort folgenden Befehl aus, um die erste Komponente der Library zu erstellen (Komponenten/Services, die außerhalb dieser Ordner schon durch die Generierung erstellt wurden können gelöscht werden, da diese nicht gebraucht werden).

```
ng generate component ${COMPONENT NAME}
```

Bei der Benennung der Komponente gilt die Konvention einen Bindestrich zu verwenden bei Namen die mehr als ein Wort beinhalten.

Beispiel um die Komponente "HeroDetailsComponent" zu erstellen:

```
ng generate component hero-details
```

Beachte, dass der Suffix "Component" automatisch von Angular ergänzt wird.

Es ist außerdem möglich die Schlüsselworte "generate" und "component" abzukürzen. Das gleiche gilt auch für die Generierung von Services:

```
ng g c hero <-- generiert die Komponente "HeroComponent"

ng g s hero <-- generiert den Service "HeroService"
```

Der Befehl zur Generierung von Komponenten erstellt einen eigenen Ordner mit dem entsprechenden Namen und legt dort eine HTML-, eine Typescript- und eine SCSS-Datei an.

Erstelle nun unter "src" eine Datei mit dem Namen ${LIBRARY NAME}.routes.ts.

Dort werden die Routen hinterlegt, die innerhalb der Library angesteuert werden können.

Fülle diese Datei initial mit folgender Zeile Code:

```typescript
export const ${LIBRARY NAME}_ROUTES: Routes = [
  { path: '', component: ${COMPONENT NAME}Component },
];
```

### 5. Inkludierung der neuen Library in der Main App

Öffne nun die Datei **app.routes.ts**, die sich im Root-Verzeichnes des Projektes unter "src/app/" befindet.

Ergänze dort das "routes"-Array um folgenden Eintrag:

```typescript
{
    path: '${LIBRARY NAME}',
    loadChildren: () => import('@${LIBRARY NAME}Lib').then((m) => m.${LIBRARY NAME}_ROUTES),
  },
```

Als letzten Schritt muss nur noch die **app.component.html** um folgende Zeile ergänzt werden:

```html
<a mat-button routerLink="/${LIBRARY NAME}" routerLinkActive="active">${LIBRARY NAME LABEL}</a>
```

Wenn du nun die Applikation startest befindet sich ein neuer Eintrag in der Navigationsleiste, der auf deine Komponente Verweist, die aus der neu angelegten Library kommt!
