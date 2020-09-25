<template>
  <div id="app">
    <h1 class="mb-5 left">Budget App</h1>
    <b-container fluid>
      <b-row cols="8">
        <b-col cols="4" class="ml-5">
          <b-form-row class="m-3 mb-5 p-3 green-border">
            <h3>Please enter your Budget</h3>
            <b-input class="mb-3 mt-2" v-model.number="newBudget"></b-input>
            <b-button type="submit" variant="outline-success" @click="Calculate">Calculate</b-button>
          </b-form-row>
          <b-form-row class="m-3 p-3 red-border">
            <h3>Please enter you expense</h3>
            <b-input class="mb-3 mt-2" v-model="newExpenseName"></b-input>
            <h3>Please enter expense Amount</h3>
            <b-input class="mb-3 mt-2" v-model.number="newExpenseValue" ></b-input>

            <b-button type="submit" variant="outline-danger" @click="CalculateExpense">Add Expense</b-button>
          </b-form-row>
        </b-col>
        <b-col class="ml-5">
          <b-row cols="4 ml-5 mt-2">
            <b-col class="mr-5">
              <h3>Budget</h3>
              <Cash font-scale="4" class="mt-3"></Cash>
              <h1 class="green mt-3">$ {{budget}}</h1>
            </b-col>
            <b-col class="mr-5">
              <h3>Expenses</h3>
              <Card font-scale="4" class="mt-3"> </Card>
              <h1 class="red mt-3">$ {{totalexpenses}}</h1>
            </b-col>
            <b-col>
              <h3>Balance</h3>
              <Wallet font-scale="4" class="mt-3"> </Wallet>
              <h1 v-if="balance() === 0" class="mt-3"> $ {{balance()}}</h1>
              <h1 v-else-if="balance() > 0" class="green mt-4"> $ {{balance()}}</h1>
              <h1 v-else-if="balance() < 0" class="red mt-4"> ${{balance()}}</h1>
            </b-col>
          </b-row>
          <b-row class="mt-5 ml-3" cols="4">
            <b-col class="ml-5 mr-5">
              <h3>Expense Title</h3>
            </b-col>
            <b-col>
              <h3>Expense Value</h3>
            </b-col>
            <b-col>
              <h3>Edit/remove</h3>
            </b-col>
          </b-row>
          <b-row v-for="(expense,id) in expenses" :key="id" class="mt-3 ml-3 border-bottom" cols="4">
            <b-col class="ml-5 mr-5">
              <h5 class="mt-3 red">- {{expense.name}}</h5>
            </b-col>
            <b-col>
              <h5 class="mt-3 red">$ {{expense.value}}</h5>
            </b-col>
            <b-col>
              <div style="font-size: 1.7rem" class="mt-2">
                <span class="mr-1" ><Pencil variant="info" class="pointer" @click="edit(expense, id)"></Pencil></span>
                <span class="ml-1"><Trash variant="danger" class="pointer" @click="remove(id)"></Trash></span>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: function(){
    return {
      budget: 0,
      newBudget: '',
      expenses:[ 
        
      ],
      newExpenseName: '',
      newExpenseValue: '',
      totalexpenses: 0,
      Balance: 0
    }
  },
  methods: {
    Calculate(){
      if(this.newBudget  === ''){
        alert('Please type the budget before submiting.')
        return
      }
      if(this.newBudget < 0){
        alert('Negative numbers not allowed.')
        this.newBudget = ''
        return
      }
      if(typeof this.newBudget == 'string'){
        alert('Type a number.')
        this.newBudget = ''
        return
      }
      this.budget = this.newBudget
      this.newBudget = ''
    },
    CalculateExpense(){
      if(this.newExpenseValue < 0){
        this.newExpenseValue = ''
        alert('Negative numbers not allowed.')
        return
      }
      if(this.newExpenseValue === '' || this.newExpenseValue === 0){
        this.newExpenseValue = ''
        alert('Please type the expense value before submiting.')
        return
      }
      if(typeof this.newExpenseValue == 'string'){
        alert('Type a number.')
        this.newExpenseValue = ''
        return
      }
      if(this.newExpenseName === ''){
        alert('Please type the expense name before submiting.')
        return
      }
      this.newExpenseName = this.newExpenseName.toUpperCase()
      this.expenses.push({name: this.newExpenseName, value: this.newExpenseValue})
      this.totalexpenses = this.expenses.reduce(function (a,b) {
        return a + b.value
      }, 0)
      this.newExpenseValue = ''
      this.newExpenseName = ''
    },
    balance(){
      return this.budget - this.totalexpenses
    },
    remove(id){
      this.expenses.splice(id, 1)
      this.totalexpenses = this.expenses.reduce(function (a,b) {
        return a + b.value
      }, 0)
    },
    edit(expense, id){
      this.newExpenseName = expense.name
      this.newExpenseValue = expense.value
      this.remove(id)
    }
  },
};
</script>

<style>
body{
  background-color: rgb(240, 239, 239) !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.left {
  text-align: left;
  margin-left: 80px;
}

.red {
  color: rgb(185, 35, 35);
}

.green {
  color: green;
}

.green-border {
  border-style: solid;
  border-color: green;
}

.red-border {
  border-style: solid;
  border-color: red;
}

.pointer{
  cursor: pointer;
}
</style>
