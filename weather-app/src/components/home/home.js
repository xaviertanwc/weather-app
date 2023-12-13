import Layout, { Content } from 'antd/es/layout/layout';
import '../../App.css';
import './home.css'
import { Button, Input, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function AppHome() {
  const [form] = Form.useForm();
  return (
    <div className='Home'>
      <div className='SearchBar'>
        <Form form={form}>
            <Form.Item name='city'>
              <div className='SearchContainer'>
                <div className='SearchLabel'>City</div>
                <Input className='SearchInput' type='text'/>
              </div>
            </Form.Item>    
            <Form.Item name='country'>
              <div className='SearchContainer'>
                <div className='SearchLabel'>Country</div>
                <Input className='SearchInput' type='text'/>
              </div>
            </Form.Item>    
        </Form>
        <Button className='SearchButton'>
          <FontAwesomeIcon className='SearchIcon' icon={faSearch}></FontAwesomeIcon>
        </Button>
      </div>
      <div className='SearchResult'></div>
    </div>
  );
}

export default AppHome;
