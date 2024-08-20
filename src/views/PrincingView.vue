<template>
  <main>
    <div class="d-flex justify-content-between mb-5">
      <h1>Tabela de precificação</h1>

      <div>
        <BButton
          style="margin-right: 1rem"
          variant="outline-info"
          @click="openModal()"
        >
          Nova precificação
        </BButton>
      </div>
    </div>

    <TableView
      :items="items"
      :fields="fields"
      :hover="true"
    />

    <BModal
      v-model="modal"
      id="pricingModal"
      :title="`Nova precificação`"
      size="lg"
    >
      <BForm
        class="d-flex flex-column"
        style="gap: 1.5rem"
      >
        <BFormGroup
          label="Vigência inicial"
          label-for="initialDate"
        >
          <BFormInput
            id="initialDate"
            v-model="form.initialDate"
            type="date"
            required
          />
        </BFormGroup>
        <BFormGroup
          label="Vigência final"
          label-for="endDate"
        >
          <BFormInput
            id="endDate"
            v-model="form.endDate"
            type="date"
            required
          />
        </BFormGroup>
        <BFormGroup
          label="Valor hora inicial"
          label-for="initialHourValue"
        >
          <BInputGroup prepend="R$">
            <BFormInput
              id="initialHourValue"
              v-model="form.initialHourValue"
              type="number"
              required
            />
          </BInputGroup>
        </BFormGroup>

        <BFormGroup
          label="Valor hora adicional"
          label-for="aditionaHourValue"
        >
          <BInputGroup prepend="R$">
            <BFormInput
              id="aditionaHourValue"
              v-model="form.aditionalHourValue"
              type="number"
              required
            />
          </BInputGroup>
        </BFormGroup>

        <BFormGroup
          label="Tolerância (min)"
          label-for="toleranceMinutes"
        >
          <BInputGroup append="min">
            <BFormInput
              id="toleranceMinutes"
              v-model="form.toleranceMinutes"
              type="number"
              required
            />
          </BInputGroup>
        </BFormGroup>
      </BForm>

      <template #footer="props">
        <BButton
          type="submit"
          variant="outline-info"
          @click="sendPricing(props)"
        >
          Adicionar precificação
        </BButton>
        <BButton
          type="reset"
          variant="outline-danger"
          @click="hideModal(props)"
        >
          Cancelar
        </BButton>
      </template>
    </BModal>
  </main>
</template>

<script>
  import TableView from '../components/TableView.vue'
  import { useToast } from 'bootstrap-vue-next'

  import api from '../service/api'
  // import moment from 'moment'

  export default {
    setup() {
      const { show } = useToast()
      const showError = (err) => show?.({ props: { title: 'Erro!', body: err } })

      return {
        TableView,
        showError
      }
    },
    data() {
      return {
        modal: false,
        items: [],
        fields: [
          {
            label: 'Vigência inicial',
            key: 'initialDate',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Vigência final',
            key: 'endDate',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Valor hora inicial',
            key: 'initialHourValue',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Valor hora adicional',
            key: 'aditionalHourValue',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Tolerância (min)',
            key: 'toleranceMinutes',
            sortable: false,
            class: 'text-center'
          }
        ],
        form: {
          initialDate: '',
          endDate: '',
          initialHourValue: '',
          aditionaHourValue: '',
          toleranceMinutes: 0
        }
      }
    },
    created() {
      this.getItems()
    },
    methods: {
      async getItems() {
        try {
          this.items = await api.getPricingItems()
        } catch (err) {
          this.showError(err)
        }
      },
      async sendPricing(props) {
        try {
          await api.sendPricing(this.form)
        } catch (err) {
          this.showError(err)
        }

        await this.getItems()
        this.hideModal(props)
      },
      openModal() {
        this.modal = true
      },
      hideModal(props) {
        this.form.initialDate = ''
        this.form.endDate = ''
        this.form.initialHourValue = ''
        this.form.aditionaHourValue = ''
        this.form.toleranceMinutes = 0
        this.modal = false

        props.hide()
      }
    }
  }
</script>
