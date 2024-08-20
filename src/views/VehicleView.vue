<template>
  <main>
    <div class="d-flex justify-content-between mb-5">
      <h1>Entrada e saída de veículos</h1>

      <div>
        <BButton
          style="margin-right: 1rem"
          variant="outline-info"
          @click="openModal(true)"
        >
          Marcar entrada
        </BButton>
        <BButton
          variant="outline-danger"
          @click="openModal(false)"
        >
          Marcar saída
        </BButton>
      </div>
    </div>

    <TableView
      :items="items"
      :fields="fields"
      :hover="true"
      @row-clicked="openModalByRow($event)"
    />

    <BModal
      v-model="modal"
      id="vehicleModal"
      :title="`Marcar ${getActionType()} do veículo`"
      size="lg"
    >
      <BForm
        class="d-flex flex-column"
        style="gap: 1.5rem"
      >
        <BFormGroup
          label="Placa"
          label-for="plate"
        >
          <BFormInput
            id="plate"
            v-model="form.plate"
            type="text"
            placeholder="Informe o número da placa"
            required
          />
        </BFormGroup>
        <BFormGroup
          label="Horário de chegada"
          labelFor="date"
        >
          <BFormInput
            id="date"
            v-model="form.date"
            type="text"
            disabled
          />
        </BFormGroup>
      </BForm>
      <template #footer="props">
        <BButton
          type="submit"
          variant="outline-info"
          @click="sendVehicle(props)"
        >
          Marcar {{ getActionType() }}
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
  import api from '../service/api'
  import moment from 'moment'

  import TableView from '../components/TableView.vue'
  import { useToast } from 'bootstrap-vue-next'

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
            label: 'Placa',
            key: 'plate',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Horário de Chegada',
            key: 'entryDate',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Horário de Saída',
            key: 'departureDate',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Duração',
            key: 'duration',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Tempo Cobrado (hora)',
            key: 'chargedTime',
            sortable: false,
            class: 'text-center'
          },
          {
            label: 'Preço (hora)',
            key: 'initialHourPricing',
            sortable: false,
            class: 'text-center'
          },
          { label: 'Valor a pagar', key: 'pricingValue', sortable: false, class: 'text-center' }
        ],
        form: {
          plate: '',
          date: ''
        },
        isEntrada: true
      }
    },
    created() {
      this.getItems()
    },
    methods: {
      async getItems() {
        try {
          this.items = await api.getParkingItems()
        } catch (err) {
          this.showError(err)
        }
      },
      async sendVehicle(props) {
        try {
          if (this.isEntrada) {
            await api.sendVehicleEntry(this.form)
          } else {
            await api.sendVehicleDeparture(this.form)
          }
        } catch (err) {
          this.showError(err)
        }

        await this.getItems()
        this.hideModal(props)
      },
      openModal(isEntrada) {
        this.form.date = moment().format('DD/MM/YYYY HH:mm:ss')
        this.isEntrada = isEntrada
        this.modal = true
      },
      hideModal(props) {
        this.form.plate = ''
        this.form.date = ''
        this.modal = false
        props.hide()
      },
      getActionType() {
        return this.isEntrada ? 'entrada' : 'saída'
      },
      openModalByRow(event) {
        const line = { ...event }

        if (line.departureDate == '-') {
          this.openModal(false)
        }
      }
    }
  }
</script>
