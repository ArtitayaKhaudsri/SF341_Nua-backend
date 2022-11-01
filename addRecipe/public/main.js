const select = (selector) => document.querySelector(selector);

const form = select('.form');
const message = select(".message")

const displayMessage = (text,color) => {
    message.style.visibility = "visible";
    message.style.backgroundColor = color;
    message.innerText = text;
    setTimeout(() => {
        message.style.visibility = "hidden";
    }, 7000);
}

const validateForm = () => {
    const menuName = select("#menuName").value.trim();
    const title = select("#title").value.trim()
    const picture = select("#picture").value
    const level = select('#level').value
    const rawMaterial = select("#rawMaterial").value.trim()
    const type = select("#type").value
    const step1 = select("#step1").value
    if (!menuName || !title || !picture || !rawMaterial || type == '0' || !step1 || level == '0') {
        return displayMessage('Field can not be empty', 'red')
    }

    return true;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault(); //

    // Validate our form
    const validate = validateForm();
    if (validate) {
        const formData = new FormData(form);
        await postData(formData)
    }
});

const resetForm =() => {
    select('#menuName').value = '';
    select('#title').value = '';
    select('#type').value = '0';
    select('#level').value = '0';
    select('#foodAllergy').value = ''
    select('#picture').value = null;
    select('#rawMaterial').value = '';
    select('#step1').value = '';
    select('#step2').value = '';
    select('#step3').value = '';
    select('#step4').value = '';
    select('#step5').value = '';
    select('#step6').value = '';
    select('#step7').value = '';
    select('#step8').value = '';
    select('#step9').value = '';
    select('#step10').value = '';
    select('#pictureStep1').value = null;
    select('#pictureStep2').value = null;
    select('#pictureStep3').value = null;
    select('#pictureStep4').value = null;
    select('#pictureStep5').value = null;
    select('#pictureStep6').value = null;
    select('#pictureStep7').value = null;
    select('#pictureStep8').value = null;
    select('#pictureStep9').value = null;
    select('#pictureStep10').value = null;
    select('#timer1').checked = false;
    select('#timer2').checked = false;
    select('#timer3').checked = false;
    select('#timer4').checked = false;
    select('#timer5').checked = false;
    select('#timer6').checked = false;
    select('#timer7').checked = false;
    select('#timer8').checked = false;
    select('#timer9').checked = false;
    select('#timer10').checked = false;
}

//update data every time
const postData = async (data) => {
    const result = await fetch('/api/create', {
        method: 'POST',
        body: data,
    });

    if (result.ok) {
        const response = await result.json()
        if (response.success) {
            displayMessage(response.message, 'green');
            resetForm();
        }
        if (!response.success) {
            displayMessage(response.message, 'red')
        }
    }
};
