$(init);

let app;

function init() {
    initVueApp();
}

Vue.component('input-text', {
    props: [
        'id',
        'name',
        'required',
        'placeholder',
        'value',
    ],
    template: '<div class="input text"><label v-bind:for="id" v-bind:input-required="required">{{name}}</label><input type="text" v-bind:required="required" v-bind:id="id" v-bind:placeholder="placeholder" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)"></div>'
});

Vue.component('input-select', {
    props: [
        'id',
        'name',
        'required',
        'values',
        'value',
    ],
    template: '<div class="input select"><label v-bind:for="id" v-bind:input-required="required">{{name}}</label><select v-bind:id="id" v-bind:value="value" v-bind:required="required" v-on:input="$emit(\'input\', $event.target.value)"><option v-for="value in values" v-bind:value="value.name">{{value.text}}</option></select></div>'
});

Vue.component('input-textarea', {
    props: [
        'id',
        'name',
        'required',
        'value',
    ],
    template: '<div class="input textarea"><label v-bind:for="id" v-bind:input-required="required">{{name}}</label><textarea v-bind:id="id" v-bind:required="required" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)"></textarea></div>'
});

Vue.component('input-multiple', {
    props: [
        'id',
        'name',
        'required',
        'values',
        'value',
    ],
    template: '<div class="input multiple"><label v-bind:for="id" v-bind:input-required="required">{{name}}</label><select v-bind:id="id" v-bind:required="required" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" multiple><option v-for="v in values" v-bind:value="v.name">{{v.text}}</option></select></div>',
});

function initVueApp() {
    app = new Vue({
        el: '#app',
        data: {
            isCorrect: false,
            isIncorrect: false,
            tabs: [
                { id: 0, name: 'Общие сведения' },
                { id: 1, name: 'Удостоверение личности' },
                { id: 2, name: 'Адрес' },
                { id: 3, name: 'Образование' },
                { id: 4, name: 'Направление подготовки' },
            ],
            page: 0,
            specCount: 1,
            formData: {
                lastName: '',
                firstName: '',
                middleName: '',
                gender: 'male',
                birthDate: '',
                birthPlace: '',
                citizenship: 'russian',
                country: '',

                documentType: 'russian',
                passportBatch: '',
                passportNumber: '',
                passportDate: '',
                passportIssuer: '',

                addressPassportCountry: 'russia',
                addressPassportCountryName: '',
                addressPassportCity: '',
                addressPassportStreet: '',
                addressPassportBuilding: '',
                addressPassportCorp: '',
                addressPassportApartment: '',
                addressPassportIndex: '',
                copyAddress: 'yes',
                addressRealCountry: 'russia',
                addressRealCountryName: '',
                addressRealCity: '',
                addressRealStreet: '',
                addressRealBuilding: '',
                addressRealCorp: '',
                addressRealApartment: '',
                addressRealIndex: '',

                education: 'school',
                educationCountry: 'russia',
                educationCountryName: '',
                educationCountryCity: '',
                institutionName: '',
                graduationYear: `${(new Date()).getFullYear()}`,
                languages: ['english', 'japanese'],

                spec: [
                    {
                        trainingProgram: 'college',
                        specialty: 'none',
                        faculty: 'foreignLanguage',
                        qualification: '1',
                        specialization: 'none1',
                        educationForm: '11',
                        payment: '111',
                    },
                ],
            },
        },
        methods: {
            setPage: function(event) {
                event.preventDefault();
                const tabTab = event.target;
                const $tabTab = $(tabTab);
                const pageID = $tabTab.attr('page-id');
                const pageNum = parseInt(pageID);
                app.page = pageNum;
            },
            getYears: function() {
                const minYear = 1945;
                const maxYear = (new Date()).getFullYear();
                let years = [];
                for(let year = maxYear; year >= minYear; --year) {
                    const yearString = `${year}`;
                    const yearObject = {
                        name: yearString,
                        text: yearString,
                    };
                    years.push(yearObject);
                }
                return years;
            },
            addSpec: function() {
                const specObject = {
                    trainingProgram: 'college',
                    specialty: 'none',
                    faculty: 'foreignLanguage',
                    qualification: '1',
                    specialization: 'none1',
                    educationForm: '11',
                    payment: '111',
                };
                this.formData.spec.push(specObject);
                ++this.specCount;
            },
            clearForm: function() {
                location.reload();
            },
            onSubmit: function() {
                const $required = $('[required]');
                $required.each(function() {
                    const $this = $(this);
                    console.log(this.value);
                    if(this.value === '') {
                        $this.addClass('incorrect-input');
                    } else {
                        $this.removeClass('incorrect-input');
                    }
                });

                const $incorrectInputs = $('.incorrect-input');
                if($incorrectInputs.length > 0) {
                    this.isIncorrect = true;
                    return;
                }

                this.isCorrect = true;
            },
        },
    });

    initVueComponents();
}

function initVueComponents() {

}