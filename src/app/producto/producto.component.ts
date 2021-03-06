import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Producto } from 'src/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Departamento } from 'src/model/departamento';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/model/marca';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { CarritoService } from '../service/carrito.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  @Input() visibleSidebar2 = null;
  visible2;
  vi;
  suscripcion: Subscription;
  constructor(
    private personaService: ProductoService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carritoServicio: CarritoService
  ) {
    // tslint:disable-next-line: only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof onanimationend) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }
  visibleSidebar1 = this.personaService.visible;
  imagenn: SafeUrl;
  imagenn2: SafeUrl;
  producto: Producto[]=[];
  carrito: Producto[]=[];
  carrito2: Producto;
  productoss: Producto[]=[];
  productose: Producto[]=[];
  productose2: Producto;
  productoco: Producto[]=[];
  productoco2: Producto;
  productomo: Producto[]=[];
  productomo2: Producto;
  productota: Producto[]=[];
  productota2: Producto;
  valprecio: number;
  departamento: Departamento[]=[];
  marca: Marca[]=[];
  marca2: any = null;
  n: string[] = [];
  iddepart: number;
  rangeValues: number[] = [];
  max: number;
  min: number;
  maxmin: number[] = [];
  mar: number;
  mo: string[] = [];
  mod: string;
  color: string;
  talla: string;
  minimo: number;
  maximo: number;
  id;
  nombre;
  variable = 'holaaa';
  sexo: string;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };
  iddd: number;
  nombress: string;
  iddepartamento: number;
  nombremarca: string;
  marcacod: Marca[]=[];
  vf;
  p: number=1;
  @ViewChild(MenuComponent) hijo: MenuComponent;
  ngOnInit(): void {
    this.cargarmarcacod();
    this.cargardepartamento();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.iddd = +this.id;

    if (this.iddd / this.iddd !== 1 && this.iddd !== 0) {
      this.vf = true;
      this.productonombre(this.id);
    } else {
      this.id = '.';
      this.vf = false;
      this.cargaropcion(this.iddd);
    }
    
  }

  cargaropcion(idde: number): void {
    this.iddepart = idde;
    this.cargarproducto(idde);
    this.cargarmarca(idde);
    this.vi = false;
    this.visibleSidebar1 = false;
    this.mar = 0;
  
    delete this.productomo2;
    delete this.productoco2;
    delete this.productota2;
    delete this.productose2;
    this.rangeValues = [];
    this.maxmin = [];
    this.mo = [];
  }
  cargarproducto(idt: number): void {
    this.personaService.detail(idt, 0).subscribe(
      (data) => {
        this.producto = data;

        this.max = 1;
        this.min = 1100;
        var myArray = [];
        for (let pro of this.producto) {
         
          myArray.push(pro.precio);
         
            
          
        }
        this.min = Math.min.apply(null,myArray);
            console.log('precio mini'+this.min);
            this.max = Math.max.apply(null,myArray);
            console.log('precio max'+this.max);
        this.minimo = this.min;
        this.maximo = this.max;
        this.options = {
          floor: this.minimo - 1,
          ceil: this.maximo + 1,
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarproductoidmarc(idmarca: number) {
    this.personaService.detail(this.iddepart, idmarca).subscribe(
      (data) => {
        this.producto = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cargardepartamento(): void {
    this.personaService.listadepar().subscribe(
      (data) => {
        this.departamento = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarimagen(imm: string): void {
    this.imagenn = this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + imm
    );
  }

  cargarmarca(idt: number) {
    
    delete this.productomo2;
    delete this.productoco2;
    delete this.productota2;
    delete this.productose2;
    this.personaService.listamarca(idt, this.id).subscribe(
      (data) => {
        this.marca = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.cargarsexo(idt);
    this.cargarcolor(idt);
    this.cargarmodelo(idt);
    this.cargartalla(idt);
  }
  cargarmarcacod() {
    delete this.marcacod;
    this.personaService.listamarcacod().subscribe(
      (data) => {
        this.marcacod = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  limpiar() {
    this.marca2.idmarca = 0;
    delete this.productomo2;
    delete this.productoco2;
    delete this.productota2;
  }
  cargarproductorangos(): void {
    this.personaService
      .rangosdept(this.rangeValues[0], this.rangeValues[1], this.iddepart)
      .subscribe(
        (data) => {
          this.producto = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  cargarmars(): void {
    this.visibleSidebar2 = false;
    this.mar = 0;

    if (this.marca2 != null) {
      this.mar = this.marca2.idmarca;
    }
    this.mod = '.';

    if (this.productomo2 != null) {
      this.mod = this.productomo2.modelo;
    }

    this.color = '.';

    if (this.productoco2 != null) {
      this.color = this.productoco2.color;
    }
    this.talla = '.';

    if (this.productota2 != null) {
      this.talla = this.productota2.talla;
    }
    this.sexo = '.';

    if (this.productose2 != null) {
      this.sexo = this.productose2.sexo;
    }
    this.personaService
      .marcass(
        this.mar,
        this.iddepart,
        this.minimo,
        this.maximo,
        this.mod,
        this.color,
        this.talla,
        this.sexo,
        this.id
      )
      .subscribe(
        (data) => {
          this.producto = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  cargarsexo(idt: number) {
    this.personaService.listasexo(idt, this.id).subscribe(
      (data) => {
        this.productose = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarcolor(idt: number) {
    this.personaService.listacolor(idt, this.id).subscribe(
      (data) => {
        this.productoco = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarmodelo(idt: number) {
    this.personaService.listamodelo(idt, this.id).subscribe(
      (data) => {
        this.productomo = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargartalla(idt: number) {
    this.personaService.listatalla(idt, this.id).subscribe(
      (data) => {
        this.productota = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  productonombre(nombre: string) {
    
    this.personaService.listanombre(nombre).subscribe(
      (data) => {
        this.producto = data;
      
        this.iddepartamento = this.producto[0].iddept;
        this.max = 1;
        this.min = 1100;

        var myArray = [];
        for (let pro of this.producto) {
         
          myArray.push(pro.precio);
         
            
          
        }
        this.min = Math.min.apply(null,myArray);
            console.log('precio mini'+this.min);
            this.max = Math.max.apply(null,myArray);
            console.log('precio max'+this.max);
        this.minimo = this.min;
        this.maximo = this.max;
        this.options = {
          floor: this.minimo - 1,
          ceil: this.maximo + 1,
        };
        this.cargarmarca(this.producto[0].iddept);
        this.iddepart = this.producto[0].iddept;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  rutacodigo(codigo: string) {
    this.router.navigate(['/detalles', codigo]);
  }
  carritocompra(prod: Producto) {
    console.log('añadir al carrito');
    this.carritoServicio.addcart(prod);
  }
}
