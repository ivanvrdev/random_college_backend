# Instituto Random - Modelo de datos
---
## Usuario
### `User`
```js
{
    username: String,
    password: String,
    email: String,
    phone: Number,
    types: [String], // student | teacher | administrative
    profile: {
        avatar: String, //uri
        first_name: String,
        last_name: String,
        cuil: Number,
        nationallity: String, 
        born_date: Date,
        sex: String, // female | male | any
        address: [{
            postal_code: Number,
            city: String,
            street_name: String,
            number: String,
            floor: Number,
            apartment: Number
        }]
        documents: [{
            description: String,
            uri: String,
            active: Boolean
        }],
    }
    classrooms: [Subject]
    active: Boolean
}
```

## Materia
### `Subject`
```js
{
    name: String,
    description: String,
    duration: String, // quartely | biannual | annual
    degrees: [Deegre],
    start_date: Date,
    lessons_schedule: [{
        day: String, // monday | tuesday | wednesday | thursday | friday
        start_hour: Time, // 24hs
        end_hour: Time // 24hs
    }],
    teachers: [{
        user: User,
        role: String, // assistant | holder | boss
        assistence: Number,
        active: Boolean    
    }],
    students: [{
        user: User,
        grades: {
            first_partial: Number,
            second_partial: Number,
            recovery_exam: Number,
            final_exam: Number,
            average: Number
        },
        assistence: Number,
        active: Boolean
    }],
    exams_schedule: {
        first_partial: Date,
        second_partial: Date,
        recovery_exam: Date,
        final_exam: Date,
    },
    taught_lessons: Number,
    classroom: {
        access_code: String,
        creation_date: Date,
        creator: User
    }
    active: Boolean
}
```

## Carrera
### `Degree`
```js
{
    name: String,
    description: String,
    duration: Number, //years
    boss: User,
    subjects: [{
        data: Subject,
        year: Number,
        mounth: Number
    }],
    students: [{
        user: User,
        status: String,
        start_date: Date,
        end_date: Date
    }]
    active: Boolean
}
```

## Posteos
### `Post`
```js
{
    autor: User,
    creation_date: Date,
    type: String, // public | private
    classroom: Classroom,
    content: {
        header: String,
        body: String,
        media: [{
            type: String,
            source: String //uri
        }] 
    }
    thread: [{
        autor: User,
        comment: String,
        creation_date: Date,
        active: Boolean
    }]
    active: Boolean
}
```