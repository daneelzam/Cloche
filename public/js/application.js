async function createOrEditPlan(form) {
  const {
    start: { value: start },
    end: { value: end },
  } = form;

  const startInp = form.start;
  const endInp = form.end;

  startInp.parentElement.children[3].innerHTML = '';
  endInp.parentElement.children[3].innerHTML = '';

  if (start.length !== 16) {
    startInp.parentElement.children[3].innerHTML = 'The field cannot be empty';
  }
  if (end.length !== 16) {
    endInp.parentElement.children[3].innerHTML = 'The field cannot be empty';
  }
  if (start.length === 16 && end.length === 16) {
    const host = document.querySelector('#userId').value;
    let { action, method } = form;
    const dataMethod = form.dataset.method;
    if (dataMethod) {
      method = dataMethod;
    }
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        start,
        end,
        host,
      }),
    });
    const result = await response.json();
    window.location.replace(`${document.location.origin}/weeklyPlan/${result.url}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const { planForm } = document.forms;
  if (planForm) {
    planForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      createOrEditPlan(planForm);
    });
  }
  const { editPartyForm } = document.forms;
  if (editPartyForm) {
    editPartyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      createOrEditPlan(editPartyForm);
    });
  }

  const { plan } = document.forms;
  if (plan) {
    plan.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const mo = document.querySelector('.Mo');
      const tu = document.querySelector('.Tu');
      const we = document.querySelector('.We');
      const th = document.querySelector('.Th');
      const fr = document.querySelector('.Fr');
      const sa = document.querySelector('.Sa');
      const su = document.querySelector('.Su');

      const week = [{ parent: mo }, { parent: tu }, { parent: we }, { parent: th }, { parent: fr }, { parent: sa }, { parent: su }];

      week.forEach((day) => {
        day.name = day.parent.children[0].innerText;
        day.breakfast = {
          nameOfDish: day.parent.children[1].children[0].children[1].value,
          linkToRecipe: day.parent.children[1].children[0].children[2].value,
          recipe: day.parent.children[1].children[0].children[4].value,
          ingredients: day.parent.children[1].children[0].children[6].value,
        };
        day.lunch = {
          nameOfDish: day.parent.children[2].children[0].children[1].value,
          linkToRecipe: day.parent.children[2].children[0].children[2].value,
          recipe: day.parent.children[2].children[0].children[4].value,
          ingredients: day.parent.children[2].children[0].children[6].value,
        };
        day.dinner = {
          nameOfDish: day.parent.children[3].children[0].children[1].value,
          linkToRecipe: day.parent.children[3].children[0].children[2].value,
          recipe: day.parent.children[3].children[0].children[4].value,
          ingredients: day.parent.children[3].children[0].children[6].value,
        };
        day.snack = {
          nameOfDish: day.parent.children[4].children[0].children[1].value,
          linkToRecipe: day.parent.children[4].children[0].children[2].value,
          recipe: day.parent.children[4].children[0].children[4].value,
          ingredients: day.parent.children[4].children[0].children[6].value,
        };
      });

      const { action, method } = plan;
      const response = await fetch(action, {
        method,
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ week }),
      });
      const result = await response.json();
      window.location.replace(result.url);
    });
  }

  const { login } = document.forms;
  if (login) {
    login.addEventListener('submit', (loginEvent) => {
      login.parentNode.classList.add('animate__backOutRight');
    });
  }

  const { signup } = document.forms;
  if (login) {
    login.addEventListener('submit', (loginEvent) => {
      login.parentNode.classList.add('animate__backOutRight');
    });
  }

  const shopList = document.querySelector('.shopList');
  if (shopList) {
    // console.dir(shopList.childNodes);
    shopList.childNodes.forEach((li) => {
      if (li.childNodes.length === 3) {
        li.childNodes[1].childNodes[1].addEventListener('click', (shopEvent) => {
          if (shopEvent.target.innerText === 'Need to buy') {
            shopEvent.target.innerText = 'bought';
          } else {
            shopEvent.target.innerText = 'Need to buy';
          }
        });
      }
    });
  }
});
