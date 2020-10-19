import store from '../store';
import studentImage from '../assets/icons/estudiante2.png';
import teacherImage from '../assets/icons/profesor2.png';
import courseImage from '../assets/icons/cursos.png';
import degreeImage from '../assets/icons/salon-de-clases.png';

const courses = () => {
    console.log('asdsad');
    if (store.state.classrooms.all.length > 0) {
        const classroom = store.state.classrooms.all[store.state.classrooms.all.length - 1];
        return classroom.courses.map(c => {
            return {
                name: () => c.name,
                cant: () => '',
                img: courseImage,
                redirectTo: () => `/aulas/${classroom._id}/${c._id}`
            }
        })
    }
    return []
}

const adminRoutes = () => {
    return [{
            name: () => 'Docentes',
            cant: () => store.state.users.all.filter(u => u.role === 'docente').length,
            img: teacherImage,
            redirectTo: () => '/usuarios'
        },
        {
            name: () => 'Alumnos',
            cant: () => store.state.users.all.filter(u => u.role === 'alumno').length,
            img: studentImage,
            redirectTo: () => '/usuarios'
        },
        {
            name: () => 'Grados',
            cant: () => store.state.degrees.all.length,
            img: degreeImage,
            redirectTo: () => '/grados'
        },
        {
            name: () => 'Cursos',
            cant: () => store.state.courses.all.length,
            img: courseImage,
            redirectTo: () => '/cursos'
        },
    ]
}

export default {
    administrador: adminRoutes,
    docente: courses,
    alumno: courses

}