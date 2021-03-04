
const a = (v = "ok") => console.log(v);
const totalHeure = (arr) => {
  let total = 0
  for (var v of arr) {
    total += v.heure
  }
  return total
}
const arrayRemove = (arr, value) => {
  return arr.filter(function(ele){ return ele !== value; })
}
const arrayRemoveId = (arr, value) => {
  return arr.filter(function(ele){ return ele.id !== value; })
}
const verify = (nv, olds) => {
  for (var prog of olds) {
    if (prog.day === nv.day && prog.nom === nv.nom) {
      return true
    }
  }
  return false
}
const random = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const copy = (arr) => {
  return arr.map(a => {return {...a}})
}
const ifArrContain = (arr, el) => {
  for (var ele of arr) {
    if (ele.id == el.id) {
      return true
    }
  }
  return false;
}

function viewportSize(){
	var test = document.createElement( "div" );

	test.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
	document.documentElement.insertBefore( test, document.documentElement.firstChild );
	
	var dims = { width: test.offsetWidth, height: test.offsetHeight };
	document.documentElement.removeChild( test );
	
	return dims;
}

a(viewportSize())
const showByDay = (liste, plage) => {
  let result = []
  for (var i = 0; i < plage.length; i++) {
    for (var j = 0; j < liste.length; j++) {
      if (plage[i].nom == liste[j].day && ifArrContain(result, liste[j]) == false) {
        result.push(liste[j])
      }
    }
  }
  return result;
}
const showByMat = (liste, matieres) => {
  let result = []
  for (var i = 0; i < matieres.length; i++) {
    for (var j = 0; j < liste.length; j++) {
      if (matieres[i].nom == liste[j].nom && ifArrContain(result, liste[j]) == false) {
        result.push(liste[j])
      }
    }
  }
  return result;
}

const plage = [
  {
    id:1,
    nom : "Lundi",
    debut : 7,
    fin : 13,
    heure : 6,
  },
  {
    id:2,
    nom : "Lundi",
    debut : 15,
    fin : 19,
    heure : 4,
  },
  {
    id:3,
    nom : "Mardi",
    debut : 7,
    fin : 13,
    heure : 6,
  },
  {
    id:4,
    nom : "Mardi",
    debut : 15,
    fin : 19,
    heure : 4,
  },
  {
    id:5,
    nom : "Jeudi",
    debut : 7,
    fin : 13,
    heure : 6,
  },
  {
    id:6,
    nom : "Jeudi",
    debut : 15,
    fin : 19,
    heure : 4,
  },
  {
    id:7,
    nom : "Vendredi",
    debut : 7,
    fin : 13,
    heure : 6,
  },
  {
    id:8,
    nom : "Vendredi",
    debut : 15,
    fin : 19,
    heure : 4,
  },
  {
    id:9,
    nom : "Mercredi",
    debut : 7,
    fin : 13,
    heure : 6,
  },
]
const matieres = [
  {
    id:1,
    nom : "Maths",
    heure : 9,
  },
  {
    id:2,
    nom : "Francais",
    heure : 3,
  },
  {
    id:3,
    nom : "PCT",
    heure : 8,
  },
  {
    id:4,
    nom : "Geo",
    heure : 3,
  },
  {
    id:5,
    nom : "SVT",
    heure : 5,
  },
  {
    id:7,
    nom : "Philo",
    heure : 3,
  },
  {
    id:6,
    nom : "Anglais",
    heure : 3,
  },
  {
    id:8,
    nom : "EPS",
    heure : 3,
  }
]
const min = 3

if (totalHeure(plage) >= totalHeure(matieres)) {
  a("Le programme peut s'executer")
}

let t_mat = totalHeure(matieres)
let c_p = copy(plage)
let c_m = copy(matieres)
let liste = []
let i = 0
while (c_m.length > 0 && c_p.length > 0) {
  for (let m of c_m) {
    let index = random(0, c_p.length - 1)
    let p = c_p[index]
    if(m.heure >= min && p.heure > 1) {
      let nom = m.nom
      let debut = 0
      let fin = 0
      let date = ""

      debut = p.debut
      fin = p.debut + min
      p.heure = p.heure - min
      m.heure = m.heure - min
      p.debut = fin
      date = p.nom

      let prog = {
        nom : nom,
        debut : debut,
        fin : fin,
        day : date,
      }

      // Les conditions qui defini la disposition des occupations doit se verifier ici.
      if (verify(prog, liste) == false) {
        prog.id = i++
        liste.push(prog)
        t_mat -= min
        if (p.heure <= 1) {
          c_p = arrayRemoveId(c_p, p.id)
        }
      }
    }
    else if ( m.heure < min ) {
      c_m = arrayRemoveId(c_m, m.id)
    }
  }
}

a(plage)
a(matieres)
a(showByMat(liste, matieres))
